import type { ReactNode } from "react";
import type { CV } from "@/lib/types/cv";
import type { AppLanguage } from "@/lib/i18n";
import { getCvTemplate } from "@/lib/cv-templates";
import { getCvLabels } from "@/components/pdf/template/labels";

function PreviewSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="mb-3 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wide text-slate-700">
        {title}
      </h3>
      {children}
    </section>
  );
}

/** A readable view of the generated content; the PDF keeps the selected layout. */
export function MobileCvPreview({
  cv,
  template,
  language,
}: {
  cv: CV;
  template: string;
  language: AppLanguage;
}) {
  const labels = getCvLabels({ ...cv, language });
  const selectedTemplate = getCvTemplate(template);

  return (
    <article
      aria-label={language === "en" ? "Your generated resume" : "Tu CV generado"}
      className="relative isolate min-h-full overflow-hidden bg-white px-5 py-6 text-sm leading-6 text-slate-700 [overflow-wrap:anywhere]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-around overflow-hidden select-none">
        {[0, 1, 2, 3].map((mark) => (
          <span key={mark} className="-rotate-30 whitespace-nowrap text-center text-4xl font-semibold tracking-wide text-slate-500/[0.09]">
            VitaeSpark · {language === "en" ? "Preview" : "Vista previa"}
          </span>
        ))}
      </div>
      <header className="border-b-2 border-slate-800 pb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
          {language === "en" ? "Reading view" : "Vista de lectura"}
        </p>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-900">{cv.nombre}</h2>
        <p className="mt-1 font-semibold" style={{ color: selectedTemplate.id === "harvard" ? "#334155" : selectedTemplate.accent }}>{cv.puesto}</p>
        <div className="mt-3 space-y-0.5 text-xs leading-5 text-slate-600">
          {cv.contacto.map((contact, index) => <p key={index}>{contact}</p>)}
        </div>
      </header>
      {cv.sobreMi ? <PreviewSection title={labels.summary}><p className="whitespace-pre-line">{cv.sobreMi}</p></PreviewSection> : null}
      {cv.experiencia.length > 0 ? (
        <PreviewSection title={labels.experience}>
          <div className="space-y-5">
            {cv.experiencia.map((item, index) => (
              <section key={index}>
                <h4 className="font-bold text-slate-900">{item.cargo}</h4>
                <p>{item.empresa}</p>
                <p className="text-xs text-slate-500">{[item.fechas, item.ubicacion].filter(Boolean).join(" · ")}</p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  {item.logros.map((achievement, achievementIndex) => <li key={achievementIndex}>{achievement}</li>)}
                </ul>
              </section>
            ))}
          </div>
        </PreviewSection>
      ) : null}
      {cv.formacion.length > 0 ? (
        <PreviewSection title={labels.education}>
          <div className="space-y-4">
            {cv.formacion.map((item, index) => (
              <section key={index}>
                <h4 className="font-bold text-slate-900">{item.titulo}</h4>
                <p>{item.institucion}</p>
                <p className="text-xs text-slate-500">{[item.fechas, item.ubicacion].filter(Boolean).join(" · ")}</p>
              </section>
            ))}
          </div>
        </PreviewSection>
      ) : null}
      {[
        { title: labels.skills, items: cv.habilidades },
        { title: labels.languages, items: cv.idiomas },
        { title: labels.additional, items: cv.informacionAdicional },
      ].map(({ title, items }) => items.length > 0 ? (
        <PreviewSection key={title} title={title}>
          <ul className="list-disc space-y-1 pl-4">{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
        </PreviewSection>
      ) : null)}
      <p className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500">
        {language === "en" ? "The PDF uses your selected template." : "El PDF usa la plantilla que elegiste."}
      </p>
    </article>
  );
}
