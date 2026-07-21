import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { BlogConversionCta } from "./BlogConversionCta";
import { BlogCvDiagnosticCta } from "./BlogCvDiagnosticCta";
import { BlogArticleVisual } from "./BlogArticleVisual";
import {
  BlogContextualAction,
  BlogReadingExperience,
} from "./BlogReadingExperience";
import { getBlogCtaContent } from "@/lib/blog-intent";
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
  const blogCta = getBlogCtaContent(path);
  const sectionItems = sections.map((section, index) => ({
    ...section,
    id: `guia-${index + 1}-${slugify(section.title)}`,
  }));
  const readingTime = getReadingTime({ title, description, intro, sections, faqs });
  const diagnosticIndex = Math.min(
    Math.max(sectionItems.length - 1, 0),
    Math.max(1, Math.floor(sectionItems.length * 0.4)),
  );
  const preferredContextualIndex = sectionItems.findIndex((section) =>
    /(ejemplo|habilidad|perfil|experiencia|estructura|paso)/i.test(section.title),
  );
  const contextualIndex =
    preferredContextualIndex === diagnosticIndex
      ? Math.max(0, diagnosticIndex - 1)
      : preferredContextualIndex >= 0
        ? preferredContextualIndex
        : 0;
  const contextualLabel = getContextualLabel(
    sectionItems[contextualIndex]?.title ?? "",
  );
  const showContextualAction = sectionItems.length >= 5;

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

  if (datePublished) articleSchema.datePublished = datePublished;
  if (dateModified) articleSchema.dateModified = dateModified;

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

  const displayDate = dateModified ?? datePublished;

  return (
    <div className="overflow-x-hidden bg-[#111113] pb-28 text-[#F4F4F5] lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <header className="relative border-b border-white/8 bg-[#0E0E12]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(122,92,255,0.12),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-11 sm:px-6 sm:py-14 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: title, href: path },
            ]}
          />

          <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/48">
            <span className="font-semibold uppercase tracking-[0.16em] text-[#B9A7FF]">
              Guía práctica
            </span>
            <span aria-hidden="true">•</span>
            <span>{readingTime} min de lectura</span>
            {displayDate ? (
              <>
                <span aria-hidden="true">•</span>
                <time dateTime={displayDate}>
                  {dateModified ? "Actualizado " : "Publicado "}
                  {new Date(displayDate).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            ) : null}
          </div>

          <div className="mt-5 max-w-[820px]">
            <h1 className="text-balance text-[2.35rem] font-semibold leading-[1.03] tracking-[-0.055em] text-[#F6F2EA] sm:text-5xl lg:text-[3.45rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/64 sm:text-lg sm:leading-8">
              {description}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,760px)_240px] lg:px-8">
        <article id="blog-article-content" className="min-w-0">
          <section className="grid gap-8 border-b border-white/10 pb-12 md:grid-cols-[minmax(0,1fr)_300px] md:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#67D2FF]">
                <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
                Respuesta breve
              </div>
              <p className="mt-4 text-pretty text-lg leading-8 text-white/82 sm:text-xl sm:leading-9">
                {intro}
              </p>
              <p className="mt-5 text-xs text-white/42">
                Contenido editorial de VitaeSpark
              </p>
            </div>
            <BlogArticleVisual intent={blogCta.intent} />
          </section>

          <div className="mt-12 space-y-12">
            {sectionItems.map((section, index) => (
              <div key={section.id} className="space-y-10">
                <section id={section.id} className="scroll-mt-24">
                  <div className="grid gap-3 sm:grid-cols-[42px_1fr]">
                    <span className="pt-1 font-mono text-xs text-[#A78BFA]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="text-balance text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-[1.75rem]">
                        {section.title}
                      </h2>
                      <div className="mt-5 space-y-5">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-[1.03rem] leading-8 text-white/72">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {showContextualAction && index === contextualIndex ? (
                  <BlogContextualAction path={path} label={contextualLabel} />
                ) : null}

                {index === diagnosticIndex ? <BlogCvDiagnosticCta path={path} /> : null}
              </div>
            ))}
          </div>

          {sources.length > 0 ? (
            <section aria-labelledby="article-sources" className="mt-14 border-t border-white/10 pt-8">
              <h2 id="article-sources" className="text-sm font-semibold text-white/78">
                Fuentes consultadas
              </h2>
              <ul className="mt-4 space-y-3">
                {sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-start gap-2 text-sm leading-6 text-[#7DD3FC] underline decoration-white/20 underline-offset-4 transition hover:text-white"
                    >
                      <span>{source.organization}: {source.title}</span>
                      <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {faqs.length > 0 ? (
            <section className="mt-14 border-t border-white/10 pt-9">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                Preguntas frecuentes
              </h2>
              <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
                {faqs.map((faq, index) => (
                  <details key={faq.question} className="group" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-base font-semibold text-white/88 marker:hidden">
                      {faq.question}
                      <ChevronDown className="h-4 w-4 shrink-0 text-white/46 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="max-w-[68ch] pb-5 pr-8 text-sm leading-7 text-white/64">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {relatedLinks.length > 0 ? (
            <section className="mt-14 border-t border-white/10 pt-9">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
                    Seguí mejorando
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                    Guías relacionadas
                  </h2>
                </div>
                <Link href="/blog" className="hidden text-sm text-white/52 transition hover:text-white sm:block">
                  Ver todo el blog
                </Link>
              </div>
              <div className="mt-6 grid gap-x-7 sm:grid-cols-2">
                {relatedLinks.map((related) => (
                  <Link
                    key={related.href}
                    href={related.href}
                    className="group border-t border-white/10 py-5"
                  >
                    <h3 className="flex items-start justify-between gap-3 text-base font-semibold leading-6 text-white/82 transition group-hover:text-white">
                      {related.title}
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#A78BFA] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/48">
                      {related.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-12">
            <BlogConversionCta path={path} content={blogCta} />
          </div>
        </article>

        <BlogReadingExperience
          path={path}
          sections={sectionItems.map(({ id, title: sectionTitle }) => ({
            id,
            title: sectionTitle,
          }))}
        />
      </div>
    </div>
  );
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getReadingTime({
  title,
  description,
  intro,
  sections,
  faqs,
}: Pick<
  BlogArticlePageProps,
  "title" | "description" | "intro" | "sections" | "faqs"
>) {
  const words = [
    title,
    description,
    intro,
    ...sections.flatMap((section) => [section.title, ...section.paragraphs]),
    ...faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]
    .join(" ")
    .trim()
    .split(/\s+/).length;

  return Math.max(3, Math.ceil(words / 200));
}

function getContextualLabel(sectionTitle: string) {
  if (/habilidad/i.test(sectionTitle)) return "Agregar estas habilidades";
  if (/perfil/i.test(sectionTitle)) return "Usar este enfoque para mi perfil";
  if (/experiencia/i.test(sectionTitle)) return "Mejorar mi experiencia";
  if (/ats|estructura|formato/i.test(sectionTitle)) return "Aplicar esta estructura";
  return "Usar este ejemplo como base";
}
