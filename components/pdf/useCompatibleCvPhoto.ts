"use client";

import { useEffect, useMemo, useState } from "react";
import type { RespuestaCV } from "@/lib/types/cv";

const compatiblePhotoCache = new Map<string, string>();

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("No se pudo decodificar la foto"));
    image.src = source;
  });
}

export async function convertPhotoToDataUrl(url: string) {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error("No se pudo cargar la foto");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  try {
    const image = await loadImage(objectUrl);
    const maxSize = 960;
    const scale = Math.min(
      1,
      maxSize / Math.max(image.naturalWidth, image.naturalHeight),
    );
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("No se pudo preparar la foto");
    }

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.9);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function getCompatiblePhoto(url: string) {
  const cached = compatiblePhotoCache.get(url);
  if (cached) return cached;

  const compatiblePhoto = await convertPhotoToDataUrl(url);
  if (compatiblePhotoCache.size >= 8) {
    const oldestKey = compatiblePhotoCache.keys().next().value;
    if (oldestKey) compatiblePhotoCache.delete(oldestKey);
  }
  compatiblePhotoCache.set(url, compatiblePhoto);
  return compatiblePhoto;
}

export function useCompatibleCvPhoto(cv: RespuestaCV["cv"]) {
  const photoUrl = cv.foto_url;
  const [preparedPhoto, setPreparedPhoto] = useState<{
    source: string;
    value: string;
  } | null>(() =>
    photoUrl?.startsWith("data:")
      ? { source: photoUrl, value: photoUrl }
      : null,
  );
  const [isPreparingPhoto, setIsPreparingPhoto] = useState(
    Boolean(photoUrl && !photoUrl.startsWith("data:")),
  );

  useEffect(() => {
    if (!photoUrl || photoUrl.startsWith("data:")) {
      setPreparedPhoto(
        photoUrl ? { source: photoUrl, value: photoUrl } : null,
      );
      setIsPreparingPhoto(false);
      return;
    }

    let isCurrent = true;
    setIsPreparingPhoto(true);

    void getCompatiblePhoto(photoUrl)
      .then((photo) => {
        if (isCurrent) setPreparedPhoto({ source: photoUrl, value: photo });
      })
      .catch(() => {
        if (isCurrent) {
          setPreparedPhoto({ source: photoUrl, value: photoUrl });
        }
      })
      .finally(() => {
        if (isCurrent) setIsPreparingPhoto(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [photoUrl]);

  const compatiblePhoto =
    preparedPhoto && preparedPhoto.source === photoUrl
      ? preparedPhoto.value
      : undefined;
  const compatibleCv = useMemo(
    () =>
      photoUrl
        ? {
            ...cv,
            foto_url: compatiblePhoto ?? photoUrl,
          }
        : cv,
    [compatiblePhoto, cv, photoUrl],
  );

  const needsPhotoPreparation = Boolean(
    photoUrl &&
      !photoUrl.startsWith("data:") &&
      preparedPhoto?.source !== photoUrl,
  );

  return {
    compatibleCv,
    isPreparingPhoto: isPreparingPhoto || needsPhotoPreparation,
  };
}
