import type { RespuestaCV } from "@/lib/types/cv"

// Componente para renderizar la plantilla Green en HTML
const GreenTemplateHTML = ({ cv }: { cv: RespuestaCV["cv"] }) => {
  // Componente para listas con viñetas
  const BulletList = ({ items }: { items: string[] }) => (
    <div className="ml-2.5 mt-1">
      {items.map((item, i) => (
        <div key={i} className="flex flex-row mb-0.5">
          <div className="w-1 h-1 rounded-full bg-green-600 mt-1.5 mr-1.5 flex-shrink-0"></div>
          <p className="text-[9px] md:text-[10px] leading-relaxed flex-1">{item}</p>
        </div>
      ))}
    </div>
  )

  // Componente para la barra lateral
  const Sidebar = () => (
    <div className="w-full md:w-[30%] aspect-auto bg-green-700 p-3 md:p-4 text-white">
      <div className="mb-4">
        <p className="text-base font-bold text-white">{cv.nombre}</p>
        <p className="text-xs font-medium text-white mt-1">{cv.puesto}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-bold text-white border-b border-white/30 pb-0.5 mb-1.5 uppercase">Sobre mí</p>
        <p className="text-[9px] md:text-[10px] text-white leading-relaxed">{cv.sobreMi}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-bold text-white border-b border-white/30 pb-0.5 mb-1.5 uppercase">Contacto</p>
        {cv.contacto.map((c, i) => (
          <p key={i} className="text-[9px] md:text-[10px] text-white mb-1">
            • {c}
          </p>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-sm font-bold text-white border-b border-white/30 pb-0.5 mb-1.5 uppercase">Habilidades</p>
        {cv.habilidades.map((h, i) => (
          <p key={i} className="text-[9px] md:text-[10px] text-white mb-1">
            • {h}
          </p>
        ))}
      </div>

      {cv.idiomas.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-bold text-white border-b border-white/30 pb-0.5 mb-1.5 uppercase">Idiomas</p>
          {cv.idiomas.map((l, i) => (
            <p key={i} className="text-[9px] md:text-[10px] text-white mb-1">
              • {l}
            </p>
          ))}
        </div>
      )}

      {cv.informacionAdicional.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-bold text-white border-b border-white/30 pb-0.5 mb-1.5 uppercase">
            Información adicional
          </p>
          {cv.informacionAdicional.map((a, i) => (
            <p key={i} className="text-[9px] md:text-[10px] text-white mb-1">
              • {a}
            </p>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="w-full bg-white text-gray-800 font-sans">
      {/* A4 size container with responsive design */}
      <div className="mx-auto w-full max-w-[210mm] h-[297mm] shadow-md print:shadow-none overflow-hidden">
        {/* Flex column on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row h-full">
          <Sidebar />
          <div className="w-full md:w-[70%] p-4 md:p-5 overflow-y-auto">
            {/* Experiencia */}
            <div className="mb-4">
              <p className="text-sm font-bold text-green-700 border-b border-gray-200 pb-0.5 mb-1.5 uppercase">
                Experiencia Laboral
              </p>
              {cv.experiencia.map((e, i) => (
                <div key={i} className="mb-3">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <p className="text-[11px] font-bold">{e.cargo}</p>
                    <p className="text-[9px] md:text-[10px] text-gray-500">{e.fechas}</p>
                  </div>
                  <p className="text-[10px] mb-0.5">{e.empresa}</p>
                  <BulletList items={e.logros} />
                </div>
              ))}
            </div>

            {/* Formación */}
            <div className="mb-4">
              <p className="text-sm font-bold text-green-700 border-b border-gray-200 pb-0.5 mb-1.5 uppercase">
                Formación
              </p>
              {cv.formacion.map((f, i) => (
                <div key={i} className="mb-3">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <p className="text-[11px] font-bold">{f.institucion}</p>
                    <p className="text-[9px] md:text-[10px] text-gray-500">{f.fechas}</p>
                  </div>
                  {f.titulo && <p className="text-[9px] md:text-[10px] text-gray-500">{f.titulo}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreenTemplateHTML
