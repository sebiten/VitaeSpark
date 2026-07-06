import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  Lightbulb,
  Link2,
  PenLine,
  Route,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "./Breadcrumbs";
import { LandingCvDiagnosticCta } from "./LandingCvDiagnosticCta";
import { TrackedCtaLink } from "./TrackedCtaLink";
import { getBaseUrl } from "@/lib/seo";

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
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const marketingLabels = {
  crearMiCv: "Crear mi CV gratis",
  verGuias: "Ver guías",
  guiaPractica: "Guía práctica",
  preguntasFrecuentes: "Preguntas frecuentes",
  comoFunciona: "Cómo funciona",
  tambienTePuedeServir: "También te puede servir",
  visualAlt: "Ejemplo de CV generado con VitaeSpark",
  visualCaption: "Currículum profesional generado",
};

const breadcrumbLabels = {
  inicio: "Inicio",
};

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
  const sectionIcons = [FileText, PenLine, Lightbulb, CheckCircle2];
  const visual = exampleImage ?? {
    src: "/purple-hero.webp",
    alt: marketingLabels.visualAlt,
    caption: marketingLabels.visualCaption,
  };
  const cta = ctaLabel || marketingLabels.crearMiCv;

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

      <section className="border-b border-white/10 bg-gradient-to-b from-[#1C1C22] via-[#111113] to-[#111113]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: breadcrumbLabels.inicio, href: "/" },
              { label: eyebrow, href: path },
            ]}
          />

          <div className="max-w-4xl space-y-6">
            <span className="inline-flex rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-4 py-1 text-sm font-medium text-[#38BDF8]">
              {eyebrow}
            </span>
            <div className="space-y-4">
              <h1 className="text-[2.45rem] font-bold leading-tight sm:text-5xl">
                {title}
              </h1>
              <p className="break-words text-base leading-8 text-white/75 sm:text-lg">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedCtaLink
                href="/crear"
                label={cta}
                sourcePath={path}
                sourceType="landing"
              />
              <Link href="/blog">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  {marketingLabels.verGuias}
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/10 pt-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="min-w-0 w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:max-w-full sm:flex sm:gap-3"
              >
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#38BDF8]" aria-hidden="true">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="mt-3 min-w-0 break-words text-sm leading-7 text-white/76 sm:mt-0">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <article className="min-w-0 w-full max-w-[calc(100vw-2rem)] overflow-hidden sm:max-w-full">
          <div className="mb-12 grid min-w-0 w-full max-w-[calc(100vw-2rem)] grid-cols-[minmax(0,1fr)] gap-6 border-b border-white/10 pb-10 sm:max-w-full lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0 w-full max-w-[calc(100vw-2rem)] sm:max-w-full">
              <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8]">
                <BookOpenCheck className="h-4 w-4" />
                {marketingLabels.guiaPractica}
              </div>
              <div className="space-y-5">
                {intro.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="min-w-0 break-words text-lg leading-9 text-white/82 sm:text-xl"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {visual ? (
              <figure className="min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C22]">
                <Image
                  src={visual.src}
                  alt={visual.alt}
                  width={560}
                  height={360}
                  sizes="(min-width: 1024px) 280px, 92vw"
                  className="block h-48 w-full max-w-full object-cover object-top"
                />
                <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/68">
                  {visual.caption}
                </figcaption>
              </figure>
            ) : null}
          </div>

          {conversionCta ? (
            <section className="mb-12 overflow-hidden rounded-3xl border border-[#7C3AED]/25 bg-gradient-to-br from-[#7C3AED]/18 via-white/[0.045] to-[#38BDF8]/10 p-6 shadow-2xl shadow-[#7C3AED]/10 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <div className="min-w-0">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">
                    Listo para postular
                  </p>
                  <h2 className="text-2xl font-semibold leading-tight text-white">
                    {conversionCta.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                    {conversionCta.description}
                  </p>
                </div>
                <TrackedCtaLink
                  href="/crear"
                  label={conversionCta.label || cta}
                  sourcePath={path}
                  sourceType="landing"
                />
              </div>
            </section>
          ) : null}

          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = sectionIcons[index % sectionIcons.length];

              return (
                <section
                  key={section.title}
                  className="min-w-0 max-w-[calc(100vw-2rem)] border-b border-white/10 pb-10 last:border-b-0 sm:max-w-full"
                >
                  <div className="mb-5 flex items-start gap-4">
                    <div className="mt-1 rounded-xl bg-[#38BDF8]/10 p-2.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2
                      id={slugify(section.title)}
                      className="text-2xl font-semibold leading-snug"
                    >
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-5 pl-0 sm:pl-[3.75rem]">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="min-w-0 break-words text-[1.03rem] leading-8 text-white/76"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              );
            })}
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

          <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-[#7C3AED]/15 p-2.5 text-[#A78BFA] ring-1 ring-[#A78BFA]/20" aria-hidden="true">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">{marketingLabels.preguntasFrecuentes}</h2>
            </div>
            <div className="divide-y divide-white/10">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="mb-2 text-base font-semibold text-white/95">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-7 text-white/75">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <aside className="min-w-0 space-y-10 lg:sticky lg:top-24 lg:self-start">
          <div className="border-l border-[#7C3AED]/30 pl-6">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
              <Route className="h-4 w-4" aria-hidden="true" />
              {marketingLabels.comoFunciona}
            </div>
            <div className="space-y-5">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="border-b border-white/10 pb-5 last:border-b-0"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20 text-xs font-semibold text-[#C4B5FD]">
                      {index + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="min-w-0 break-words text-sm leading-7 text-white/70">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-l border-[#38BDF8]/30 pl-6">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#38BDF8]">
              <Link2 className="h-4 w-4" aria-hidden="true" />
              {marketingLabels.tambienTePuedeServir}
            </div>
            <div className="grid gap-5">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group block border-b border-white/10 pb-5 transition last:border-b-0 hover:border-[#38BDF8]/40"
                >
                  <h3 className="mb-2 flex items-center justify-between gap-3 text-base font-semibold">
                    {link.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
                  </h3>
                  <p className="min-w-0 break-words text-sm leading-7 text-white/70">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
