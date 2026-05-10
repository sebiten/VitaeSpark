import Image from "next/image";
import { BadgeCheck, FileDown, PenLine, ScanSearch, Sparkles } from "lucide-react";

const floatingCards = [
  {
    label: "Lectura ATS",
    value: "Estructura clara",
    icon: <ScanSearch className="h-4 w-4" />,
    delay: "0.1s",
  },
  {
    label: "IA aplicada",
    value: "Logros reescritos",
    icon: <Sparkles className="h-4 w-4" />,
    delay: "0.22s",
  },
  {
    label: "PDF final",
    value: "Listo para enviar",
    icon: <FileDown className="h-4 w-4" />,
    delay: "0.34s",
  },
];

export default function HeroShowcase() {
  return (
    <div className="hero-showcase relative mx-auto mt-5 w-full min-w-0 max-w-[340px] select-none px-0 sm:mt-2 sm:max-w-xl sm:px-8 lg:mx-0 lg:mt-0 lg:max-w-none lg:px-0">
      <div className="hero-showcase-piece hero-showcase-side-left absolute -left-2 top-12 z-0 hidden w-[82px] overflow-hidden rounded-2xl border border-black/60 bg-[#0F0F10] shadow-2xl shadow-black/35 min-[390px]:block sm:left-0 sm:w-[120px] md:w-[140px] lg:-left-12 lg:w-[155px]">
        <Image
          src="/blue.webp"
          alt="Plantilla azul de curriculum"
          width={320}
          height={450}
          draggable={false}
          sizes="155px"
          className="aspect-[0.48] w-full object-cover object-left-top opacity-95"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-[#0F0F10]/35 to-[#0F0F10]/82" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-black/55" />
      </div>

      <div className="hero-showcase-piece hero-showcase-side-right absolute -right-2 bottom-12 z-0 hidden w-[96px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/35 min-[390px]:block sm:right-0 sm:w-[164px] md:w-[205px] lg:-right-5 lg:bottom-12 lg:w-[220px]">
        <Image
          src="/green.webp"
          alt="Plantilla verde de curriculum"
          width={320}
          height={450}
          draggable={false}
          sizes="220px"
          className="aspect-[0.72] w-full object-cover object-top opacity-95"
        />
      </div>

      <div className="hero-showcase-card relative z-10 mx-auto w-full max-w-[560px] overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#17171C]/88 p-2 shadow-2xl shadow-black/45 backdrop-blur sm:overflow-visible sm:rounded-[1.7rem] sm:p-3">
        <div className="mb-2 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5 sm:mb-3 sm:px-4 sm:py-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#38BDF8]">
              Vista previa
            </p>
            <p className="mt-1 text-[11px] font-semibold text-white sm:text-sm">
              Curriculum generado por VitaeSpark
            </p>
          </div>
          <span className="rounded-full bg-[#38BDF8] px-3 py-1 text-xs font-bold text-[#0F0F10]">
            ATS
          </span>
        </div>

        <div className="relative max-h-[330px] overflow-hidden rounded-2xl bg-white sm:max-h-none">
          <div className="hero-scan-line pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[#38BDF8]/16 to-transparent" />
          <Image
            src="/purple-hero.webp"
            alt="Ejemplo de curriculum vitae creado con VitaeSpark"
            width={760}
            height={900}
            priority
            draggable={false}
            sizes="(min-width: 1024px) 42vw, 92vw"
            className="aspect-[0.82] w-full object-cover object-top"
          />

          <div className="hero-showcase-note absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-[#111113]/88 p-3 text-white shadow-xl backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-[#7C3AED] p-2 max-[389px]:hidden">
                <PenLine className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold sm:text-base">
                  Perfil y logros mejor redactados
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-white/70 sm:text-sm sm:leading-5">
                  El resultado mantiene tu informacion, pero la presenta con
                  orden y criterio profesional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto mt-3 hidden max-w-[560px] grid-cols-3 gap-2 sm:grid">
        {floatingCards.map((card) => (
          <div
            key={card.label}
            className="hero-showcase-mini rounded-xl border border-white/10 bg-[#111113]/78 px-2.5 py-2 text-white shadow-xl shadow-black/25 backdrop-blur-md"
            style={{ animationDelay: card.delay }}
          >
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-[#38BDF8]/10 p-1.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
                {card.icon}
              </span>
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  {card.label}
                </span>
                <span className="block whitespace-nowrap text-[11px] font-semibold">
                  {card.value}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-20 -mt-2 mx-auto flex max-w-[92%] items-center justify-between rounded-2xl border border-[#7C3AED]/25 bg-[#111113]/90 px-4 py-2.5 text-xs text-white shadow-2xl shadow-black/40 backdrop-blur sm:hidden">
        <span className="inline-flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-[#A78BFA]" />
          Texto mejorado
        </span>
        <span className="text-[#38BDF8]">Listo para enviar</span>
      </div>
    </div>
  );
}
