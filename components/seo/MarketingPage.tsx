import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  ChevronDown,
} from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { LandingCvDiagnosticCta } from "./LandingCvDiagnosticCta";
import { TrackedCtaLink } from "./TrackedCtaLink";
import { getBaseUrl } from "@/lib/seo";
import { getJobCreateHref } from "@/lib/job-landing";

type Faq = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  title: string;
  description: string;
};

type Step = {
  title: string;
  description: string;
};

type Section = {
  title: string;
  paragraphs: string[];
};

type ExampleImage = {
  src: string;
  alt: string;
  caption: string;
};

type ConversionCta = {
  title: string;
  description: string;
  label?: string;
};

type DiagnosticCta = {
  title: string;
  description: string;
  items: string[];
  label: string;
  trackingLabel: string;
};

type MarketingPageProps = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string[];
  benefits: string[];
  steps: Step[];
  sections: Section[];
  faqs: Faq[];
  relatedLinks: RelatedLink[];
  exampleImage?: ExampleImage;
  ctaLabel?: string;
  conversionCta?: ConversionCta;
  diagnosticCta?: DiagnosticCta;
};

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function MarketingPage({
  path,
  eyebrow,
  title,
  description,
  intro,
  benefits,
  steps,
  sections,
  faqs,
  relatedLinks,
  exampleImage,
  ctaLabel,
  conversionCta,
  diagnosticCta,
}: MarketingPageProps) {
  const visual = exampleImage ?? {
    src: "/modern-ats.png",
    alt: "Ejemplo de CV profesional generado con VitaeSpark",
    caption: "Ejemplo ilustrativo de un currículum generado en VitaeSpark.",
  };
  const cta = ctaLabel || "Crear mi CV";
  const createHref = getJobCreateHref(path);
  const baseUrl = getBaseUrl();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howtoSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
      url: new URL(path, baseUrl).toString(),
    })),
  };

  return (
    <div className="overflow-x-hidden bg-[#111113] text-[#F4F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
      />

      <section className="relative border-b border-white/9 bg-[#0D0D10]">
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 lg:px-8 lg:pt-10">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: eyebrow, href: path },
            ]}
          />

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-[#C4B5FD]">{eyebrow}</p>
              <h1 className="mt-4 text-[clamp(2.5rem,5.5vw,4.15rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#F6F2EA]">
                {title}
              </h1>
              <p className="mt-6 max-w-[62ch] text-base leading-8 text-white/68 sm:text-lg">
                {description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <TrackedCtaLink
                  href={createHref}
                  label={cta}
                  sourcePath={path}
                  sourceType="landing"
                  trackingLabel="profession_hero_cta"
                />
                <Link
                  href="#guia"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-medium text-white/72 transition-colors hover:border-white/24 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/55"
                >
                  Ver la guía
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <p className="mt-4 text-xs text-white/46">
                Pago único. PDF descargable. Editable desde tu perfil.
              </p>
            </div>

            <figure className="mx-auto w-full max-w-[390px] lg:mx-0">
              <div className="relative aspect-[210/297] overflow-hidden rounded-[20px] bg-[#F4F4F1] shadow-[0_28px_70px_rgba(0,0,0,0.34)] ring-1 ring-white/14">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 390px, 84vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 text-xs leading-5 text-white/48">
                {visual.caption}
              </figcaption>
            </figure>
          </div>

          <div className="mt-10 grid border-y border-white/9 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className="flex gap-3 border-b border-white/9 py-4 last:border-b-0 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <Check className="mt-1 size-4 shrink-0 text-[#A78BFA]" />
                <p className="text-sm leading-6 text-white/66">
                  <span className="sr-only">Beneficio {index + 1}: </span>
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="guia"
        className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8 lg:py-20"
      >
        <article className="min-w-0 max-w-[760px]">
          <header className="border-b border-white/9 pb-10">
            <div className="mb-5 flex items-center gap-2 text-sm font-medium text-[#C4B5FD]">
              <BookOpenCheck className="size-4" />
              Guía práctica
            </div>
            <div className="space-y-5">
              {intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-9 text-white/78 first:text-xl first:text-white/88"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          {conversionCta ? (
            <section className="border-b border-white/9 py-10">
              <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <div>
                  <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#F6F2EA]">
                    {conversionCta.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-white/66">
                    {conversionCta.description}
                  </p>
                </div>
                <TrackedCtaLink
                  href={createHref}
                  label={conversionCta.label || cta}
                  sourcePath={path}
                  sourceType="landing"
                  trackingLabel="profession_context_cta"
                />
              </div>
            </section>
          ) : null}

          <div>
            {sections.map((section, index) => (
              <section
                key={section.title}
                className="border-b border-white/9 py-10 last:border-b-0"
              >
                <div className="grid gap-4 sm:grid-cols-[36px_minmax(0,1fr)]">
                  <span className="pt-1 text-sm tabular-nums text-white/34">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2
                      id={slugify(section.title)}
                      className="text-2xl font-semibold leading-snug tracking-[-0.025em] text-[#F4F4F5]"
                    >
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-[1.03rem] leading-8 text-white/70"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {diagnosticCta ? (
            <div className="mt-10">
              <LandingCvDiagnosticCta
                path={path}
                title={diagnosticCta.title}
                description={diagnosticCta.description}
                items={diagnosticCta.items}
                ctaLabel={diagnosticCta.label}
                trackingLabel={diagnosticCta.trackingLabel}
              />
            </div>
          ) : null}

          <section className="mt-14 border-t border-white/9 pt-10">
            <h2 className="text-2xl font-semibold tracking-[-0.03em]">
              Preguntas frecuentes
            </h2>
            <div className="mt-5 divide-y divide-white/9 border-y border-white/9">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold text-white/88 outline-none transition-colors hover:text-white focus-visible:text-white">
                    {faq.question}
                    <ChevronDown className="size-4 shrink-0 text-white/42 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="max-w-[68ch] pb-5 pr-8 text-sm leading-7 text-white/66">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        </article>

        <aside className="min-w-0 space-y-10 lg:sticky lg:top-24 lg:self-start">
          <section>
            <h2 className="text-sm font-semibold text-white/88">Cómo funciona</h2>
            <ol className="mt-4 border-t border-white/9">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[28px_1fr] gap-3 border-b border-white/9 py-4">
                  <span className="text-xs tabular-nums text-[#A78BFA]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white/84">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-white/55">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-white/88">
              También te puede servir
            </h2>
            <div className="mt-4 border-t border-white/9">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group block border-b border-white/9 py-4 outline-none transition-colors hover:border-white/18 focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/50"
                >
                  <h3 className="flex items-center justify-between gap-3 text-sm font-semibold text-white/78 transition-colors group-hover:text-white">
                    {link.title}
                    <ArrowRight className="size-4 shrink-0 text-white/36 transition-transform group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/52">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
