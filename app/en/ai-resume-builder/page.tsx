import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileSearch,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { TrackedCtaLink } from "@/components/seo/TrackedCtaLink";
import { buildMetadata, getBaseUrl } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Resume Builder for ATS-Friendly Resumes | VitaeSpark",
  description:
    "Use VitaeSpark as your AI resume builder to write a clearer ATS-friendly resume, keep control of your details and download a professional PDF.",
  path: "/en/ai-resume-builder",
  locale: "en_US",
  keywords: [
    "ai resume builder",
    "ats friendly resume",
    "resume builder with ai",
    "professional resume pdf",
  ],
  languages: {
    es: "/hacer-cv-con-ia",
    en: "/en/ai-resume-builder",
    "x-default": "/hacer-cv-con-ia",
  },
});

const faqs = [
  {
    question: "Does the AI invent work experience?",
    answer:
      "No. VitaeSpark is designed to improve wording and structure based on the information you provide. You should still review the final resume before using it.",
  },
  {
    question: "Can I edit the resume before paying?",
    answer:
      "Yes. You can review the generated preview, go back, change your details and generate a new version before unlocking the final PDF.",
  },
  {
    question: "Is this useful for entry-level resumes?",
    answer:
      "Yes. It works well for first-job and junior profiles because it helps organize studies, projects, skills and part-time experience into a cleaner resume.",
  },
];

export default function EnglishAiResumeBuilderPage() {
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
  const pageUrl = new URL("/en/ai-resume-builder", baseUrl).toString();

  return (
    <div className="overflow-x-hidden bg-[#111113] text-[#F4F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="border-b border-white/10 bg-gradient-to-b from-[#1C1C22] via-[#111113] to-[#111113]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-4 py-1 text-sm font-medium text-[#38BDF8]">
            AI resume builder
          </span>
          <div className="mt-6 max-w-4xl space-y-5">
            <h1 className="text-[2.5rem] font-bold leading-tight text-white sm:text-5xl">
              Turn rough work history into a clearer ATS-friendly resume
            </h1>
            <p className="max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
              VitaeSpark helps job seekers write a stronger resume with AI
              without losing control of the original information. You write the
              raw details, the app improves structure and wording, and you
              unlock a professional PDF when the result is ready.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedCtaLink
              href="/crear?lang=en"
              label="Create my resume"
              sourcePath="/en/ai-resume-builder"
              sourceType="landing"
              language="en"
            />
            <Link
              href="/en"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-white/78 transition hover:border-[#38BDF8]/30 hover:bg-white/[0.07] sm:h-14 sm:px-7 sm:text-base"
            >
              Back to VitaeSpark
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<Bot className="h-5 w-5" />}
              title="AI improves wording"
              text="Use your own information and turn it into cleaner resume copy that sounds more professional."
            />
            <FeatureCard
              icon={<FileSearch className="h-5 w-5" />}
              title="ATS-friendly structure"
              text="Sections stay readable, focused and easier for recruiters and filters to scan."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Preview before unlock"
              text="Review the protected preview first, then unlock the final PDF when you are satisfied."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <article className="space-y-12">
          <ContentBlock
            title="Why an AI resume builder is different from a blank template"
            paragraphs={[
              "A blank template only gives you layout. It does not help decide what to emphasize, what to shorten or how to write a more credible professional summary.",
              "VitaeSpark starts from your raw notes and improves the language after that. This makes it useful for people who know what they did but do not know how to express it clearly in resume format.",
            ]}
          />

          <ContentBlock
            title="What VitaeSpark actually helps with"
            paragraphs={[
              "It helps organize work experience, education, skills, languages and additional details into a resume structure that looks cleaner and more consistent.",
              "It is especially useful when your current draft feels repetitive, too informal, too long or too vague for job applications.",
            ]}
          />

          <ContentBlock
            title="Good fit for entry-level and international applicants"
            paragraphs={[
              "If you are applying for a first job, junior role or international remote position, a clearer resume usually matters more than fancy design. VitaeSpark focuses on clarity first.",
              "The English flow also keeps PayPal in USD as the primary payment option, which makes the experience more coherent for international traffic.",
            ]}
          />

          <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-[#7C3AED]/15 p-2.5 text-[#A78BFA] ring-1 ring-[#A78BFA]/20">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold">FAQ</h2>
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

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-[#15151A] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">
              Quick path
            </p>
            <div className="mt-5 space-y-4">
              <StepRow number="01" text="Write your raw work history and skills." />
              <StepRow number="02" text="Generate a clearer resume with AI." />
              <StepRow number="03" text="Review the preview and unlock the PDF." />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#15151A] p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
              Related links
            </p>
            <div className="space-y-4">
              <RelatedLink
                href="/en"
                title="VitaeSpark home"
                description="Main English landing for the product."
              />
              <RelatedLink
                href="/crear?lang=en"
                title="Create your resume"
                description="Start directly in the English flow."
              />
              <RelatedLink
                href={pageUrl}
                title="This page"
                description="Commercial intent page for AI resume builder traffic."
                external
              />
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#38BDF8]">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-white/68">{text}</p>
    </div>
  );
}

function ContentBlock({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section className="border-b border-white/10 pb-10 last:border-b-0">
      <div className="mb-5 flex items-start gap-4">
        <div className="mt-1 rounded-xl bg-[#38BDF8]/10 p-2.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-semibold leading-snug">{title}</h2>
      </div>
      <div className="space-y-5 pl-0 sm:pl-[3.75rem]">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[1.03rem] leading-8 text-white/76">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

function StepRow({ number, text }: { number: string; text: string }) {
  return (
    <div className="border-b border-white/10 pb-4 last:border-b-0">
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7C3AED]/20 text-xs font-semibold text-[#C4B5FD]">
          {number}
        </span>
        <p className="text-sm leading-7 text-white/70">{text}</p>
      </div>
    </div>
  );
}

function RelatedLink({
  href,
  title,
  description,
  external = false,
}: {
  href: string;
  title: string;
  description: string;
  external?: boolean;
}) {
  const content = (
    <>
      <div className="mb-2 flex items-center justify-between gap-3 text-base font-semibold">
        <span>{title}</span>
        <ArrowRight className="h-4 w-4 shrink-0 text-white/50" />
      </div>
      <p className="text-sm leading-7 text-white/70">{description}</p>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className="group block border-b border-white/10 pb-4 transition last:border-b-0 hover:border-[#38BDF8]/40"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="group block border-b border-white/10 pb-4 transition last:border-b-0 hover:border-[#38BDF8]/40"
    >
      {content}
    </Link>
  );
}
