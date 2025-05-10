import type { RespuestaCV } from "@/lib/types/cv"

// Componente para renderizar la plantilla Harvard en HTML
const HarvardTemplateHTML = ({ cv }: { cv: RespuestaCV["cv"] }) => {
  // Componente para listas con viñetas
  const BulletList = ({ items }: { items: string[] }) => (
    <div className="ml-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-row mb-0.5">
          <span className="w-2 text-center mr-1.5">•</span>
          <p className="text-[9px] flex-1">{item}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-full bg-white text-black font-serif p-8" style={{ fontFamily: "Times New Roman, serif" }}>
      {/* Header */}
      <div className="text-center mb-2.5">
        <p className="text-lg font-extrabold mb-1.5">{cv.nombre}</p>
        <p className="text-[11px] text-[#1E40AF] mt-1 mb-0.5">{cv.contacto.join(" • ")}</p>
      </div>

      <p className="text-[10px] text-justify mb-1 leading-relaxed">{cv.sobreMi}</p>

      {/* Experience */}
      <div className="mb-2.5">
        <p className="text-[10px] font-bold uppercase border-b border-black pb-1 mb-1.5">Experiencia Profesional</p>
        {cv.experiencia.map((exp, i) => (
          <div key={i} className="mb-2.5">
            <div className="flex justify-between mb-0.5">
              <div>
                <p className="text-[11px] font-bold">{exp.empresa}</p>
                <p className="text-[11px] italic">{exp.cargo}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px]">{exp.ubicacion}</p>
                <p className="text-[10px]">{exp.fechas}</p>
              </div>
            </div>
            <BulletList items={exp.logros} />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-2.5">
        <p className="text-[10px] font-bold uppercase border-b border-black pb-1 mb-1.5">Educación</p>
        {cv.formacion.map((edu, i) => (
          <div key={i} className="mb-1.5">
            <div className="flex justify-between">
              <div>
                <p className="text-[11px] font-bold">{edu.institucion}</p>
                <p className="text-[11px] italic">{edu.titulo || ""}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px]">{edu.ubicacion}</p>
                <p className="text-[10px]">{edu.fechas}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-2.5">
        <p className="text-[10px] font-bold uppercase border-b border-black pb-1 mb-1.5">Habilidades</p>
        <BulletList items={cv.habilidades} />
      </div>

      {/* Languages */}
      {cv.idiomas.length > 0 && (
        <div className="mb-2.5">
          <p className="text-[10px] font-bold uppercase border-b border-black pb-1 mb-1.5">Idiomas</p>
          <BulletList items={cv.idiomas} />
        </div>
      )}

      {/* Additional Info */}
      {cv.informacionAdicional.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase border-b border-black pb-1 mb-1.5">Información Adicional</p>
          <BulletList items={cv.informacionAdicional} />
        </div>
      )}
    </div>
  )
}

export default HarvardTemplateHTML
