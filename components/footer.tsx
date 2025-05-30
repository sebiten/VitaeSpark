import Link from "next/link";
import { Zap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F0F10] border-t border-[#1F1F22] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Producto</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/crear"
                  className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
                >
                  Crear CV
                </Link>
              </li>
              <li>
                <Link
                  href="/perfil"
                  className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
                >
                  Perfil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg my-3 text-white">Empresa</h3>
            <ul className="space-y-2">
              <li className="text-white">Soporte:</li>
              <li>
                <Link
                  href="mailto:soporte@vitaespark.com"
                  className="text-sm text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
                >
                  soporte@vitaespark.com
                </Link>
              </li>
              <div className="flex items-center justify-start gap-2 mt-2 text-[#F4F4F5]/70 hover:text-[#F4F4F5]">
                <Instagram className="h-5 w-5 mt-1 text-white" />
                <Link
                  href="https://www.instagram.com/vitae.spark/"
                  className=""
                >
                  Instagram
                </Link>
              </div>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F1F22] mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-[#F4F4F5]/60">
            © {new Date().getFullYear()} VitaeSpark.
          </p>
        </div>
      </div>
    </footer>
  );
}
