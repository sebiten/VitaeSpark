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
import { BlogConversionCta, getBlogCtaContent } from "./BlogConversionCta";
import { BlogCvDiagnosticCta } from "./BlogCvDiagnosticCta";
import { TrackedCtaLink } from "./TrackedCtaLink";
import { getBaseUrl } from "@/lib/seo";
import { FloatingRobot } from "@/components/floating-robot";

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

type ArticleSource = {
  href: string;
  title: string;
  organization: string;
};

type BlogArticlePageProps = {
  path: string;
  title: string;
  description: string;
  intro: string;
  sections: ArticleSection[];
  faqs: ArticleFaq[];
  relatedLinks: ArticleRelatedLink[];
  sources?: ArticleSource[];
  datePublished?: string;
  dateModified?: string;
};

const blogLabels = {
  guiaBadge: "Guía",
  respuestaBreve: "Respuesta breve",
  autoria: "Contenido editorial de VitaeSpark",
  actualizado: "Actualizado",
  crearMiCv: "Crear mi CV gratis",
  verMasArticulos: "Ver más artículos",
  preguntasFrecuentes: "Preguntas frecuentes",
  fuentesConsultadas: "Fuentes consultadas",
  tambienTePuedeServir: "También te puede servir",
  ejemploAlt: "Ejemplo de currículum",
  figcaption: "Currículum profesional creado con VitaeSpark",
};

const blogBreadcrumbs = {
  inicio: "Inicio",
  blog: "Blog",
};

export function BlogArticlePage({
  path,
  title,
  description,
  intro,
  sections,
  faqs,
  relatedLinks,
  sources = [],
  datePublished,
  dateModified,
}: BlogArticlePageProps) {
  const sectionIcons = [FileText, PenLine, Lightbulb, CheckCircle2];
  const blogCta = getBlogCtaContent(path);
  const paragraphCount = sections.reduce(
    (total, section) => total + section.paragraphs.length,
    0,
  );
  const shouldShowMidCta = sections.length >= 6 && paragraphCount >= 10;
  const midCtaIndex = Math.floor(sections.length / 2);

  const baseUrl = getBaseUrl();
  const articleUrl = new URL(path, baseUrl).toString();

  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${articleUrl}#article`,
    url: articleUrl,
    headline: title,
    description,
    inLanguage: "es-AR",
    image: new URL("/elegance-good.webp", baseUrl).toString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
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
    <div className="overflow-x-hidden bg-[#111113] pb-28 text-[#F4F4F5] md:pb-0">
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

      <section className="border-b border-white/10 bg-gradient-to-b from-[#1C1C22] to-[#111113]">
        <div className="mx-auto max-w-4xl min-w-0 px-4 py-20 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: blogBreadcrumbs.inicio, href: "/" },
              { label: blogBreadcrumbs.blog, href: "/blog" },
              { label: title, href: path },
            ]}
          />
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1 text-sm font-medium text-[#A78BFA]">
              {blogLabels.guiaBadge}
            </span>
            {(dateModified || datePublished) && (
              <time
                dateTime={dateModified ?? datePublished}
                className="text-sm text-white/60"
              >
                {dateModified ? `${blogLabels.actualizado} ` : ""}
                {new Date(dateModified ?? datePublished!).toLocaleDateString(
                  "es-AR",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </time>
            )}
          </div>
          <h1 className="mt-6 text-[2.45rem] font-bold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
            {description}
          </p>
          <p className="mt-3 text-sm text-white/55">{blogLabels.autoria}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedCtaLink
              href="/crear"
              label={blogLabels.crearMiCv}
              sourcePath={path}
              sourceType="blog"
            />
            <Link href="/blog">
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                {blogLabels.verMasArticulos}
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
                {blogLabels.respuestaBreve}
              </div>
              <p className="text-lg leading-9 text-white/82 sm:text-xl">
                {intro}
              </p>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C22]">
              <Image
                src="/elegance-good.webp"
                alt={blogLabels.ejemploAlt}
                width={560}
                height={360}
                sizes="(min-width: 1024px) 280px, 92vw"
                className="h-48 w-full object-cover object-top"
              />
              <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/68">
                {blogLabels.figcaption}
              </figcaption>
            </figure>
          </div>

          <div className="space-y-12">
            {sections.map((section, index) => {
              const Icon = sectionIcons[index % sectionIcons.length];
              const showDiagnosticCta = index === 0;
              const showMidCta =
                shouldShowMidCta && index === midCtaIndex && !showDiagnosticCta;

              return (
                <div key={section.title} className="space-y-12">
                  <section className="border-b border-white/10 pb-10 last:border-b-0">
                    <div className="mb-5 flex items-start gap-4">
                      <div
                        className="mt-1 rounded-xl bg-[#38BDF8]/10 p-2.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15"
                        aria-hidden="true"
                      >
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
                  {showDiagnosticCta && <BlogCvDiagnosticCta path={path} />}
                  {showMidCta && (
                    <BlogConversionCta
                      path={path}
                      content={blogCta}
                      variant="mid"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <BlogConversionCta path={path} content={blogCta} variant="final" />
          </div>

          {sources.length > 0 && (
            <section
              aria-labelledby="article-sources"
              className="mt-12 border-t border-white/10 pt-8"
            >
              <h2
                id="article-sources"
                className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60"
              >
                {blogLabels.fuentesConsultadas}
              </h2>
              <ul className="mt-4 space-y-3">
                {sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm leading-6 text-[#7DD3FC] underline decoration-white/20 underline-offset-4 transition hover:text-white"
                    >
                      {source.organization}: {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-[#7C3AED]/15 p-2.5 text-[#A78BFA] ring-1 ring-[#A78BFA]/20" aria-hidden="true">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">{blogLabels.preguntasFrecuentes}</h2>
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
          <div className="relative border-l border-[#8B5CF6]/30 pl-6">
            <FloatingRobot size="sm" className="-top-6 -left-8 opacity-30" />
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#8B5CF6]">
              <Link2 className="h-4 w-4" aria-hidden="true" />
              {blogLabels.tambienTePuedeServir}
            </div>
            <div className="grid gap-5">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group block border-b border-white/[0.06] pb-5 transition last:border-b-0 hover:border-[#8B5CF6]/30"
                >
                  <h3 className="mb-2 flex items-center justify-between gap-3 text-base font-semibold text-white/80">
                    {link.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
                  </h3>
                  <p className="text-sm leading-7 text-white/50">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
      <BlogConversionCta path={path} content={blogCta} variant="stickyMobile" />
    </div>
  );
}
