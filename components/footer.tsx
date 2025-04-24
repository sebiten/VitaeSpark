import Link from "next/link"
import { Zap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0F0F10] border-t border-[#1F1F22] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#7C3AED] p-1.5 rounded-md">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">VitaeSpark</span>
            </Link>
            <p className="text-sm text-[#F4F4F5]/70">
              La forma más rápida y accesible de crear CVs profesionales que realmente superan los filtros de las
              empresas.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Producto</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Plantillas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Testimonios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Guías de CV
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Consejos de entrevista
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Tendencias laborales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                  Términos de servicio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F1F22] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#F4F4F5]/60">
            © {new Date().getFullYear()} VitaeSpark. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
              Privacidad
            </Link>
            <span className="text-[#1F1F22]">•</span>
            <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
              Términos
            </Link>
            <span className="text-[#1F1F22]">•</span>
            <Link href="#" className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
