import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  CheckCircle2,
  Download,
  FileText,
  Search,
  Sparkles,
} from "lucide-react";
import HeroShowcase from "@/components/HeroShowcase";
import { TrackedCtaLink } from "@/components/seo/TrackedCtaLink";
import { buildMetadata, getBaseUrl } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Resume Builder for ATS-Friendly PDFs | VitaeSpark",
  description:
    "Create an ATS-friendly resume with AI, professional templates and PDF download. VitaeSpark helps U.S. job seekers build a clear resume fast.",
  path: "/en",
  locale: "en_US",
  keywords: [
    "ai resume builder",
    "resume builder",
    "ats resume builder",
    "create resume online",
    "resume pdf",
    "professional resume builder",
  ],
  languages: {
    es: "/",
    en: "/en",
    "x-default": "/",
  },
});

const benefits = [
  "ATS-friendly structure",
  "AI-improved resume writing",
  "Professional PDF download",
];

const steps = [
  {
    icon: FileText,
    title: "Add your details",
    text: "Work history, education, skills, links and the role you want.",
  },
  {
    icon: Bot,
    title: "AI improves the wording",
    text: "Turn rough notes into clear resume sections recruiters can scan.",
  },
  {
    icon: Download,
    title: "Download as PDF",
    text: "Unlock your final resume and download it from your profile.",
  },
];

export default function EnglishHomePage() {
  const baseUrl = getBaseUrl();
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VitaeSpark",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: new URL("/en", baseUrl).toString(),
    inLanguage: "en-US",
    description:
      "AI resume builder for ATS-friendly resumes, professional templates and PDF download.",
    offers: {
      "@type": "Offer",
      price: "4.99",
      priceCurrency: "USD",
    },
  };

  return (
    <div className="overflow-x-hidden bg-[#111113] text-[#F4F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <section className="relative isolate overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:pb-24 lg:pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(124,58,237,0.2)_0%,rgba(15,15,16,0.92)_42%,rgba(15,15,16,1)_68%,rgba(56,189,248,0.14)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.11]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(500px,1.08fr)]">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-[#F4F4F5]/76 shadow-2xl shadow-black/20 backdrop-blur">
              <Sparkles className="h-4 w-4 shrink-0 text-[#38BDF8]" />
              <span>AI resume builder for real job applications</span>
            </div>

            <h1 className="text-pretty text-[2.65rem] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.65rem] lg:leading-[0.96]">
              Build an ATS-friendly resume with AI
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-[#F4F4F5]/74 sm:text-lg md:text-xl md:leading-8">
              VitaeSpark turns your experience into a clear, professional
              resume ready to download as PDF. Built for job seekers who want a
              polished resume without spending hours editing templates.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedCtaLink
                href="/crear?lang=en"
                label="Create my resume"
                sourcePath="/en"
                sourceType="landing"
                language="en"
              />
              <Link
                href="/crear?lang=en"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-white/78 transition hover:border-[#38BDF8]/30 hover:bg-white/[0.07] sm:h-14 sm:px-7 sm:text-base"
              >
                Start with a template
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#F4F4F5]/72">
              {benefits.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <HeroShowcase />
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#15151A] px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <span className="mb-4 inline-flex rounded-full border border-[#38BDF8]/25 bg-[#38BDF8]/10 px-4 py-1 text-sm font-medium text-[#38BDF8]">
              How it works
            </span>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              From rough notes to a resume ready to send
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-6"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#A78BFA]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-[#38BDF8]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#1C1C22] via-[#15151A] to-[#1C1C22] p-6 sm:p-8 md:grid-cols-[1fr_360px] md:p-10">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8]">
              <Search className="h-4 w-4" />
              ATS-friendly by design
            </div>
            <h2 className="text-3xl font-bold text-white">
              Make your resume easier for recruiters and filters to read
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">
              VitaeSpark keeps the structure clean, organizes your experience
              into readable sections and helps you avoid generic wording. You
              keep control of your information while AI improves presentation.
            </p>
            <div className="mt-7">
              <TrackedCtaLink
                href="/crear?lang=en"
                label="Start in English"
                sourcePath="/en"
                sourceType="landing"
                language="en"
              />
            </div>
          </div>
          <Image
            src="/elegance-good.webp"
            alt="Professional resume example generated by VitaeSpark"
            width={720}
            height={880}
            className="h-full max-h-[420px] w-full rounded-2xl object-cover object-top"
          />
        </div>
      </section>
    </div>
  );
}
