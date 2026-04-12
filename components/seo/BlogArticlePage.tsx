import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "./Breadcrumbs";

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
};

export function BlogArticlePage({
  path,
  title,
  description,
  intro,
  sections,
  faqs,
  relatedLinks,
}: BlogArticlePageProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "es",
    author: {
      "@type": "Organization",
      name: "Vitae Spark",
    },
    publisher: {
      "@type": "Organization",
      name: "Vitae Spark",
    },
  };

  return (
    <div className="bg-[#0F0F10] text-[#F4F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.20),_transparent_35%),#0F0F10]">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: title, href: path },
            ]}
          />
          <span className="inline-flex rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1 text-sm font-medium text-[#A78BFA]">
            Guia VitaeSpark
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/75">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/crear">
              <Button
                size="lg"
                className="bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 hover:opacity-90"
              >
                Crear mi CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <article className="space-y-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="text-lg leading-8 text-white/80">{intro}</p>
          </div>

          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-white/10 bg-[#121217] p-8"
            >
              <h2 className="mb-5 text-2xl font-semibold">{section.title}</h2>
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
            </section>
          ))}

          <section className="rounded-3xl border border-white/10 bg-[#121217] p-8">
            <h2 className="mb-6 text-2xl font-semibold">Preguntas frecuentes</h2>
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
          </section>
        </article>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-[#38BDF8]/20 bg-[linear-gradient(180deg,rgba(56,189,248,0.08),rgba(124,58,237,0.08))] p-7">
            <h2 className="mb-4 text-xl font-semibold">Contenido relacionado</h2>
            <div className="grid gap-4">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-[#38BDF8]/40 hover:bg-black/30"
                >
                  <h3 className="mb-2 text-base font-semibold">{link.title}</h3>
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
