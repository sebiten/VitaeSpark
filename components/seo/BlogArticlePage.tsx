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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "./Breadcrumbs";
import { TrackedCtaLink } from "./TrackedCtaLink";
import { getBaseUrl } from "@/lib/seo";

type ArticleSection = {
  title: string;
  paragraphs: string[];
};

type ArticleFaq = {
  question: string;
  answer: string;
};

type ArticleRelatedLink = {
  href: string;
  title: string;
  description: string;
};

type BlogArticlePageProps = {
  path: string;
  title: string;
  description: string;
  intro: string;
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  relatedLinks: ArticleRelatedLink[];
  datePublished?: string;
  dateModified?: string;
};

export function BlogArticlePage({
path,
  title,
  description,
  intro,
  sections,
  faqs,
  relatedLinks,
  datePublished,
  dateModified,
}: BlogArticlePageProps) {
  const sectionIcons = [FileText, PenLine, Lightbulb, CheckCircle2];

  const baseUrl = getBaseUrl();

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "es",
    image: new URL("/og-image.png", baseUrl).toString(),
    author: {
      "@type": "Organization",
      name: "Vitae Spark",
      url: baseUrl.href,
    },
    publisher: {
      "@type": "Organization",
      name: "Vitae Spark",
      url: baseUrl.href,
      logo: {
        "@type": "ImageObject",
        url: new URL("/logoreal.webp", baseUrl).toString(),
      },
    },
  };

  if (datePublished) {
    articleSchema.datePublished = datePublished;
  }

  if (dateModified) {
    articleSchema.dateModified = dateModified;
  }

  const faqSchema =
    faqs.length > 0
      ? {
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
        }
      : null;

  return (
<div className="overflow-x-hidden bg-[#0F0F10] text-[#F4F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.20),_transparent_35%),#0F0F10]">
        <div className="mx-auto max-w-4xl min-w-0 px-4 py-20 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: title, href: path },
            ]}
          />
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1 text-sm font-medium text-[#A78BFA]">
              Guia VitaeSpark
            </span>
            {datePublished && (
              <time dateTime={datePublished} className="text-sm text-white/60">
                {new Date(datePublished).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            )}
          </div>
          <h1 className="mt-6 text-[2.45rem] font-bold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedCtaLink
              href="/crear"
              label="Crear mi CV"
              sourcePath={path}
              sourceType="blog"
            />
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                Ver mas articulos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
        <article className="min-w-0 max-w-full">
          <div className="mb-12 grid gap-6 border-b border-white/10 pb-10 lg:grid-cols-[1fr_280px]">
            <div>
<div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8]">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                Lectura recomendada
              </div>
              <p className="text-lg leading-9 text-white/82 sm:text-xl">
                {intro}
              </p>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#121217]">
              <Image
                src="/elegance-good.webp"
                alt="Ejemplo de curriculum profesional creado con VitaeSpark"
                width={560}
                height={360}
                sizes="(min-width: 1024px) 280px, 92vw"
                className="h-48 w-full object-cover object-top"
              />
              <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/68">
                Usa cada guia como referencia y adapta el contenido a tu perfil.
              </figcaption>
            </figure>
          </div>

          <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = sectionIcons[index % sectionIcons.length];

            return (
            <section
              key={section.title}
              className="border-b border-white/10 pb-10 last:border-b-0"
            >
              <div className="mb-5 flex items-start gap-4">
<div className="mt-1 rounded-xl bg-[#38BDF8]/10 p-2.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-semibold leading-snug">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-5 pl-0 sm:pl-[3.75rem]">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.03rem] leading-8 text-white/76"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
            );
          })}
          </div>

          <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
<div className="rounded-xl bg-[#7C3AED]/15 p-2.5 text-[#A78BFA] ring-1 ring-[#A78BFA]/20" aria-hidden="true">
              <HelpCircle className="h-5 w-5" />
            </div>
              <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
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

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="border-l border-[#38BDF8]/30 pl-6">
<div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#38BDF8]">
              <Link2 className="h-4 w-4" aria-hidden="true" />
              Tambien te puede servir
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
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/35 transition group-hover:translate-x-1 group-hover:text-[#38BDF8]" />
                  </h3>
                  <p className="text-sm leading-7 text-white/70">
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
