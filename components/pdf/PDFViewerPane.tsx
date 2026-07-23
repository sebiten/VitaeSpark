"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useMemo, useState } from "react";
import type { RespuestaCV } from "@/lib/types/cv";
import { DocumentoCV, DocumentoCVW } from "./CVDocument";

type Props = {
  cv: RespuestaCV["cv"];
  template?: string | null;
  watermark?: boolean;
  className?: string;
};

const compatiblePhotoCache = new Map<string, string>();

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("No se pudo decodificar la foto"));
    image.src = source;
  });
}

async function convertPhotoToDataUrl(url: string) {
  const response = await fetch(url, { cache: "force-cache" });
  if (!response.ok) {
    throw new Error("No se pudo cargar la foto");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  try {
    const image = await loadImage(objectUrl);
    const maxSize = 960;
    const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
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

export default function PDFViewerPane({
  cv,
  template,
  watermark = false,
  className,
}: Props) {
  const photoUrl = cv.foto_url;
  const [compatiblePhoto, setCompatiblePhoto] = useState<string | undefined>(
    photoUrl?.startsWith("data:") ? photoUrl : undefined,
  );
  const [isPreparingPhoto, setIsPreparingPhoto] = useState(
    Boolean(photoUrl && !photoUrl.startsWith("data:")),
  );
  const Document = watermark ? DocumentoCVW : DocumentoCV;

  useEffect(() => {
    if (!photoUrl || photoUrl.startsWith("data:")) {
      setCompatiblePhoto(photoUrl);
      setIsPreparingPhoto(false);
      return;
    }

    let isCurrent = true;
    setCompatiblePhoto(undefined);
    setIsPreparingPhoto(true);

    void getCompatiblePhoto(photoUrl)
      .then((photo) => {
        if (isCurrent) setCompatiblePhoto(photo);
      })
      .catch(() => {
        if (isCurrent) {
          setCompatiblePhoto(photoUrl);
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsPreparingPhoto(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [photoUrl]);

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

  if (isPreparingPhoto) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F4F1EA] text-sm text-slate-500 ${className ?? ""}`}
      >
        Preparando vista del CV...
      </div>
    );
  }

  return (
    <PDFViewer
      showToolbar={false}
      className={className}
    >
      <Document cv={compatibleCv} template={template || undefined} />
    </PDFViewer>
  );
}
