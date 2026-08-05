import Image from "next/image";
import {
  CheckCircle2,
  Download,
  FilePenLine,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { TrackedCtaLink } from "@/components/seo/TrackedCtaLink";
import { PRICING } from "@/lib/pricing";

type OfferMarket = "argentina" | "international";

const offerCopy = {
  argentina: {
    language: "es" as const,
    sourcePath: "/cv-listo-argentina",
    trackingLabel: "facebook_direct_offer_ars",
    eyebrow: "CV PROFESIONAL · PRECIO ARGENTINA",
    title: "Un CV claro, editable y listo para enviar.",
    subtitle:
      "Cargá tus datos, revisá el resultado completo y pagá recién cuando estés conforme.",
    price: PRICING.mercadoPago.label,
    previousPrice: PRICING.mercadoPago.previousLabel,
    payment: "Pago seguro con Mercado Pago",
    cta: `Crear mi CV por ${PRICING.mercadoPago.shortLabel}`,
    previewLabel: "Vista previa real",
    previewTitle: "Primero mirás el resultado",
    previewText:
      "La marca de agua se elimina después del pago. No comprás una plantilla vacía.",
    socialProof: "Más de 500 personas ya eligieron VitaeSpark",
    footer: "Pago único · Sin suscripción · Sin registro para empezar",
    benefits: [
      {
        icon: Sparkles,
        title: "Proceso rápido y guiado",
        text: "La IA ordena tu información sin inventar experiencia.",
      },
      {
        icon: Download,
        title: "PDF sin marca de agua",
        text: "Descargalo apenas se confirma el pago.",
      },
      {
        icon: FilePenLine,
        title: "Editable desde tu perfil",
        text: "Guardalo, corregilo y volvé a descargarlo.",
      },
    ],
  },
  international: {
    language: "en" as const,
    sourcePath: "/resume-ready",
    trackingLabel: "facebook_direct_offer_usd",
    eyebrow: "AI RESUME BUILDER · INTERNATIONAL PRICE",
    title: "A clear, editable resume ready to apply.",
    subtitle:
      "Enter your experience, review the complete result, and pay only when you are ready.",
    price: PRICING.paypal.label,
    previousPrice: PRICING.paypal.previousLabel,
    payment: "Secure international checkout with PayPal",
    cta: `Create my resume for ${PRICING.paypal.label}`,
    previewLabel: "Real preview",
    previewTitle: "See the result before paying",
    previewText:
      "The watermark is removed after payment. You are not buying an empty template.",
    socialProof: "More than 500 people have chosen VitaeSpark",
    footer: "One-time payment · No subscription · No sign-up to start",
    benefits: [
      {
        icon: Sparkles,
        title: "Fast, guided process",
        text: "AI organizes your information without inventing experience.",
      },
      {
        icon: Download,
        title: "Watermark-free PDF",
        text: "Download it as soon as your payment is confirmed.",
      },
      {
        icon: FilePenLine,
        title: "Editable from your account",
        text: "Save it, update it, and download it again.",
      },
    ],
  },
} as const;

export function FacebookOfferPage({ market }: { market: OfferMarket }) {
  const copy = offerCopy[market];

  return (
    <div className="relative isolate min-h-[calc(100dvh-64px)] overflow-hidden bg-[#0C0C10] text-[#F6F2EA]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(122,92,255,0.22),transparent_31%),radial-gradient(circle_at_12%_78%,rgba(56,189,248,0.09),transparent_28%),linear-gradient(135deg,#0C0C10_0%,#141219_48%,#09090B_100%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(246,242,234,0.56)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.48)_1px,transparent_1px)] [background-size:82px_82px]" />
      </div>

      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,0.78fr)] lg:items-center lg:gap-14 lg:py-16">
        <section>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D7C8FF]/15 bg-white/[0.045] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D7C8FF]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.eyebrow}
          </div>

          <h1 className="mt-6 max-w-[13ch] text-balance text-[3.25rem] font-semibold leading-[0.94] tracking-[-0.065em] sm:text-6xl lg:text-[4.85rem]">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-8 text-[#D8D2C8]/72 sm:text-lg">
            {copy.subtitle}
          </p>

          <div className="mt-8 border-y border-white/10 py-6">
            <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
              <strong className="text-5xl font-semibold tracking-[-0.055em] text-[#F6F2EA] sm:text-6xl">
                {copy.price}
              </strong>
              <div className="pb-1">
                <span className="block text-sm text-white/32 line-through">
                  {copy.previousPrice}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A997FF]">
                  {market === "argentina" ? "Pago único" : "One-time payment"}
                </span>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/62">
              <ShieldCheck className="h-4 w-4 text-[#6EE7B7]" aria-hidden="true" />
              {copy.payment}
            </p>
          </div>

          <TrackedCtaLink
            href="/crear"
            label={copy.cta}
            sourcePath={copy.sourcePath}
            sourceType="landing"
            language={copy.language}
            trackingLabel={copy.trackingLabel}
            className="mt-7 block w-full sm:inline-flex sm:w-auto"
            buttonClassName="h-14 w-full rounded-full bg-[#F6F2EA] px-7 text-[15px] font-semibold text-[#121114] shadow-[0_18px_45px_rgba(246,242,234,0.13)] transition hover:-translate-y-0.5 hover:bg-white sm:w-auto"
          />
          <p className="mt-4 text-xs font-medium text-white/46">{copy.footer}</p>

          <div className="mt-8 flex items-center gap-3 border-t border-white/8 pt-5 text-sm text-white/66">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D7C8FF]/15 bg-[#7A5CFF]/10 text-[#D7C8FF]">
              <UsersRound className="h-4 w-4" aria-hidden="true" />
            </span>
            <strong className="font-semibold text-white/82">{copy.socialProof}</strong>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-[470px]">
          <div className="absolute -inset-8 -z-10 rounded-full bg-[#7A5CFF]/12 blur-[70px]" />
          <div className="rounded-[34px] border border-white/10 bg-[#17161B]/90 p-4 shadow-[0_35px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A997FF]">
                  {copy.previewLabel}
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-[-0.025em]">
                  {copy.previewTitle}
                </h2>
              </div>
              <span className="rounded-full border border-[#6EE7B7]/20 bg-[#6EE7B7]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6EE7B7]">
                {market === "argentina" ? "Editable" : "Editable"}
              </span>
            </div>

            <div className="overflow-hidden rounded-[24px] bg-[#F5F2EA] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]">
              <Image
                src="/elegance-good.webp"
                alt={
                  market === "argentina"
                    ? "Vista previa de un CV profesional creado con VitaeSpark"
                    : "Preview of a professional resume created with VitaeSpark"
                }
                width={800}
                height={1080}
                priority
                className="aspect-[0.76] w-full rounded-[16px] object-cover object-top shadow-[0_18px_45px_rgba(19,17,15,0.22)]"
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-white/58">{copy.previewText}</p>
          </div>
        </section>
      </main>

      <section className="border-y border-white/8 bg-[#111014]/90 px-4 py-9 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {copy.benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="flex gap-4 border-white/8 md:border-r md:pr-5 md:last:border-r-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D7C8FF]/15 bg-[#7A5CFF]/10 text-[#D7C8FF]">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white/88">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#6EE7B7]" aria-hidden="true" />
                  {title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-white/52">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
