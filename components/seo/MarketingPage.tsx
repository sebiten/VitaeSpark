import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "./Breadcrumbs";
import { TrackedCtaLink } from "./TrackedCtaLink";

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
};

function slugify(text: string) {
  return text
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
  ctaLabel = "Crear mi CV",
}: MarketingPageProps) {
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

  return (
    <div className="bg-[#0F0F10] text-[#F4F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_right,_rgba(124,58,237,0.22),_transparent_40%),#0F0F10]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Recursos", href: "/blog" },
              { label: eyebrow, href: path },
            ]}
          />
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-4 py-1 text-sm font-medium text-[#38BDF8]">
              {eyebrow}
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-white/75">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <TrackedCtaLink
                href="/crear"
                label={ctaLabel}
                sourcePath={path}
                sourceType="landing"
              />
              <Link href="/blog">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  Ver guias
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#38BDF8]/10 text-[#38BDF8]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm leading-7 text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="mb-6 text-2xl font-semibold">
              Como te ayuda VitaeSpark
            </h2>
            <div className="space-y-5">
              {intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-8 text-white/75"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {exampleImage ? (
              <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <img
                  src={exampleImage.src}
                  alt={exampleImage.alt}
                  className="h-auto w-full"
                  loading="lazy"
                />
                <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-white/65">
                  {exampleImage.caption}
                </figcaption>
              </figure>
            ) : null}
          </div>

          <div className="rounded-3xl border border-[#7C3AED]/20 bg-[#15151A] p-8">
            <h2 className="mb-6 text-2xl font-semibold">Como funciona</h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7C3AED] text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-3xl border border-white/10 bg-[#121217] p-8"
              >
                <h2
                  id={slugify(section.title)}
                  className="mb-4 text-2xl font-semibold"
                >
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-8 text-white/75"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-white/10 bg-[#121217] p-8">
            <h2 className="mb-6 text-2xl font-semibold">
              Preguntas frecuentes
            </h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-white/10 pb-5">
                  <h3 className="mb-2 text-base font-semibold">
                    {faq.question}
                  </h3>
                  <p className="text-sm leading-7 text-white/70">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#38BDF8]/20 bg-[linear-gradient(180deg,rgba(56,189,248,0.08),rgba(124,58,237,0.08))] p-8">
            <h2 className="mb-6 text-2xl font-semibold">
              Recursos relacionados
            </h2>
            <div className="grid gap-4">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-[#38BDF8]/40 hover:bg-black/30"
                >
                  <h3 className="mb-2 text-lg font-semibold">{link.title}</h3>
                  <p className="text-sm leading-7 text-white/70">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
