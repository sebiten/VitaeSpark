const GUEST_PHOTO_DB_NAME = "vitaespark-guest-assets";
const GUEST_PHOTO_STORE = "photos";
const GUEST_PHOTO_DB_VERSION = 1;
const GUEST_PHOTO_KEY_PREFIX = "guest-photo-";

export const GUEST_PHOTO_TTL_MS = 24 * 60 * 60 * 1000;
export const MAX_GUEST_PHOTO_INPUT_BYTES = 3 * 1024 * 1024;
export const MAX_GUEST_PHOTO_STORED_BYTES = 1_800_000;
export const ALLOWED_GUEST_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

type GuestPhotoRecord = {
  key: string;
  blob: Blob;
  expiresAt: number;
};

export type PhotoSyncState = "idle" | "uploading" | "error";

export function isGuestPhotoKey(
  value?: string | null,
): value is string {
  return Boolean(
    value &&
      /^guest-photo-[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        value,
      ),
  );
}

export function isEphemeralPhotoUrl(value?: string | null) {
  return value?.startsWith("blob:") ?? false;
}

export async function prepareGuestPhoto(file: File) {
  const blob = await preparePhotoBlob(file);
  const key = `${GUEST_PHOTO_KEY_PREFIX}${crypto.randomUUID()}`;
  const database = await openGuestPhotoDatabase();

  try {
    await runRequest(
      database
        .transaction(GUEST_PHOTO_STORE, "readwrite")
        .objectStore(GUEST_PHOTO_STORE)
        .put({
          key,
          blob,
          expiresAt: Date.now() + GUEST_PHOTO_TTL_MS,
        } satisfies GuestPhotoRecord),
    );
  } finally {
    database.close();
  }

  return { key, blob };
}

export async function preparePhotoBlob(file: File) {
  if (!ALLOWED_GUEST_PHOTO_TYPES.has(file.type)) {
    throw new Error("unsupported_photo_type");
  }

  if (file.size > MAX_GUEST_PHOTO_INPUT_BYTES) {
    throw new Error("photo_too_large");
  }

  const blob = await compressPhoto(file);
  if (blob.size > MAX_GUEST_PHOTO_STORED_BYTES) {
    throw new Error("photo_compression_failed");
  }

  return blob;
}

export async function getGuestPhoto(key: string) {
  if (!isGuestPhotoKey(key)) return null;

  const database = await openGuestPhotoDatabase();
  let record: GuestPhotoRecord | undefined;

  try {
    record = await runRequest<GuestPhotoRecord | undefined>(
      database
        .transaction(GUEST_PHOTO_STORE, "readonly")
        .objectStore(GUEST_PHOTO_STORE)
        .get(key),
    );
  } finally {
    database.close();
  }

  if (!record) return null;

  if (record.expiresAt <= Date.now()) {
    await removeGuestPhoto(key);
    return null;
  }

  if (
    !ALLOWED_GUEST_PHOTO_TYPES.has(record.blob.type) ||
    record.blob.size > MAX_GUEST_PHOTO_STORED_BYTES
  ) {
    await removeGuestPhoto(key);
    return null;
  }

  return record.blob;
}

export async function removeGuestPhoto(key?: string | null) {
  if (!isGuestPhotoKey(key)) return;

  const database = await openGuestPhotoDatabase();
  try {
    await runRequest(
      database
        .transaction(GUEST_PHOTO_STORE, "readwrite")
        .objectStore(GUEST_PHOTO_STORE)
        .delete(key),
    );
  } finally {
    database.close();
  }
}

export function guestPhotoExtension(blob: Blob) {
  if (blob.type === "image/png") return "png";
  if (blob.type === "image/webp") return "webp";
  return "jpg";
}

async function compressPhoto(file: File): Promise<Blob> {
  try {
    const image = await decodeImage(file);
    const maxDimension = 1200;
    const scale = Math.min(
      1,
      maxDimension / Math.max(image.width, image.height),
    );
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) throw new Error("canvas_unavailable");

    context.drawImage(image.source, 0, 0, width, height);
    image.cleanup();

    for (const quality of [0.84, 0.72, 0.6]) {
      const candidate = await canvasToBlob(canvas, "image/webp", quality);
      if (
        candidate &&
        candidate.size > 0 &&
        candidate.size <= MAX_GUEST_PHOTO_STORED_BYTES
      ) {
        return candidate;
      }
    }
  } catch {
    // El archivo original sigue siendo válido si ya entra en el límite real.
  }

  if (file.size <= MAX_GUEST_PHOTO_STORED_BYTES) return file;
  throw new Error("photo_compression_failed");
}

async function decodeImage(file: File): Promise<{
  source: CanvasImageSource;
  width: number;
  height: number;
  cleanup: () => void;
}> {
  if ("createImageBitmap" in window) {
    const bitmap = await createImageBitmap(file);
    return {
      source: bitmap,
      width: bitmap.width,
      height: bitmap.height,
      cleanup: () => bitmap.close(),
    };
  }

  const objectUrl = URL.createObjectURL(file);
  const image = document.createElement("img");

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("invalid_image"));
    image.src = objectUrl;
  });

  return {
    source: image,
    width: image.naturalWidth,
    height: image.naturalHeight,
    cleanup: () => URL.revokeObjectURL(objectUrl),
  };
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
) {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

function openGuestPhotoDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("indexeddb_unavailable"));
      return;
    }

    const request = window.indexedDB.open(
      GUEST_PHOTO_DB_NAME,
      GUEST_PHOTO_DB_VERSION,
    );

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(GUEST_PHOTO_STORE)) {
        database.createObjectStore(GUEST_PHOTO_STORE, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("indexeddb_open_failed"));
  });
}

function runRequest<T = IDBValidKey>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("indexeddb_request_failed"));
  });
}
