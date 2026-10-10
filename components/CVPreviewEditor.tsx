"use client";

import { useState } from "react";
import { CVContentEditor } from "@/components/CVContentEditor";
import { validateEditedCv } from "@/lib/cv-content";
import type { CV } from "@/lib/types/cv";

export function CVPreviewEditor({ value, language, onSave, onCancel }: {
  value: CV;
  language: "es" | "en";
  onSave: (cv: CV) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(value);
  const [error, setError] = useState("");
  const en = language === "en";
  return (
    <form className="space-y-5" onSubmit={(event) => {
      event.preventDefault();
      const result = validateEditedCv(draft);
      if (!result.success) {
        setError(en ? "Review the required fields and text limits. Changes have not been saved." : "Revisá los campos obligatorios y los límites de texto. Los cambios no se guardaron.");
        return;
      }
      // Photo synchronization may complete while the content editor is open.
      onSave({ ...result.data, foto_url: value.foto_url });
    }}>
      <h2 className="text-2xl font-bold text-white">{en ? "Edit your resume" : "Editar tu CV"}</h2>
      <p className="text-sm text-white/65">{en ? "Save your changes without generating again." : "Guardá los cambios sin volver a generar."}</p>
      <CVContentEditor value={draft} onChange={setDraft} language={language} />
      {error ? <p role="alert" className="text-sm text-rose-300">{error}</p> : null}
      <div className="flex gap-3">
        <button type="submit" className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white">{en ? "Save changes" : "Guardar cambios"}</button>
        <button type="button" onClick={onCancel} className="rounded-xl border border-white/20 px-5 py-3 text-white">{en ? "Cancel" : "Cancelar"}</button>
      </div>
    </form>
  );
}
