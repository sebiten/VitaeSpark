"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { TrackedCtaLink } from "./TrackedCtaLink";
import { getBlogCreateHref, type BlogCtaContent } from "@/lib/blog-intent";
import { recordGaEvent } from "@/lib/analytics-events";
import { cn } from "@/lib/utils";

type BlogReadingExperienceProps = {
  path: string;
  sections: Array<{ id: string; title: string }>;
  content: BlogCtaContent;
};

const DEPTH_THRESHOLDS = [25, 50, 75, 90] as const;

export function BlogReadingExperience({
  path,
  sections,
  content,
}: BlogReadingExperienceProps) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [stickyVisible, setStickyVisible] = useState(false);
  const [stickyDismissed, setStickyDismissed] = useState(true);
  const firedDepths = useRef(new Set<number>());
  const createHref = getBlogCreateHref(path);

  useEffect(() => {
    const dismissKey = `vitaespark-blog-sticky-dismissed:${path}`;
    setStickyDismissed(window.sessionStorage.getItem(dismissKey) === "1");

    let frame = 0;
    const updateProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const article = document.getElementById("blog-article-content");
        if (!article) return;

        const rect = article.getBoundingClientRect();
        const articleTop = window.scrollY + rect.top;
        const readableDistance = Math.max(
          article.offsetHeight - window.innerHeight * 0.65,
          1,
        );
        const nextProgress = Math.min(
          100,
          Math.max(0, ((window.scrollY - articleTop + 120) / readableDistance) * 100),
        );

        setProgress(Math.round(nextProgress));
        setStickyVisible(nextProgress >= 12 && nextProgress < 96);

        DEPTH_THRESHOLDS.forEach((threshold) => {
          if (nextProgress >= threshold && !firedDepths.current.has(threshold)) {
            firedDepths.current.add(threshold);
            recordGaEvent("blog_scroll_depth", {
              article_path: path,
              scroll_percent: threshold,
            });
          }
        });
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [path]);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -68% 0px", threshold: [0, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  const dismissSticky = () => {
    window.sessionStorage.setItem(`vitaespark-blog-sticky-dismissed:${path}`, "1");
    setStickyDismissed(true);
  };

  return (
    <>
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center justify-between text-xs font-medium text-white/48">
            <span>Progreso de lectura</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-px overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#A78BFA] transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <nav aria-label="En esta guía" className="mt-7">
            <p className="text-sm font-semibold text-white/86">En esta guía</p>
            <ol className="mt-4 space-y-3">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={cn(
                      "grid grid-cols-[22px_1fr] gap-2 text-sm leading-5 transition-colors",
                      activeSection === section.id
                        ? "text-white"
                        : "text-white/48 hover:text-white/76",
                    )}
                  >
                    <span className="font-mono text-[10px] leading-5 text-[#A78BFA]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-7 border-t border-white/10 pt-5">
            <div className="flex items-start gap-2 text-xs leading-5 text-white/58">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
              {content.proof}
            </div>
            <TrackedCtaLink
              href={createHref}
              label="Empezar mi CV"
              sourcePath={path}
              sourceType="blog"
              trackingLabel="blog_sidebar_cta"
              buttonSize="sm"
              buttonClassName="mt-4 w-full rounded-full bg-[#F6F2EA] text-[#121114] shadow-none hover:bg-white"
            />
            <p className="mt-3 text-[11px] leading-5 text-white/42">
              Crealo y revisalo gratis. Pagás solo si querés descargar el PDF final.
            </p>
          </div>
        </div>
      </aside>

      {stickyVisible && !stickyDismissed ? (
        <div
          className="fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-[#151419]/96 p-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.42)] backdrop-blur-lg">
            <div className="min-w-0 flex-1 pl-1">
              <p className="truncate text-sm font-semibold text-white">Empezar mi CV</p>
              <p className="truncate text-[11px] text-white/52">Revisalo gratis antes de pagar</p>
            </div>
            <TrackedCtaLink
              href={createHref}
              label="Empezar"
              sourcePath={path}
              sourceType="blog"
              trackingLabel="blog_sticky_mobile_cta"
              buttonSize="sm"
              showIcon={false}
              buttonClassName="rounded-full bg-[#F6F2EA] px-4 text-[#121114] shadow-none hover:bg-white"
            />
            <button
              type="button"
              onClick={dismissSticky}
              aria-label="Cerrar acceso rápido"
              className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/46 transition hover:bg-white/8 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function BlogContextualAction({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-3 border-y border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-white/88">Llevá este ejemplo a tu propio CV</p>
        <p className="mt-1 text-xs leading-5 text-white/48">Podés revisarlo y editarlo antes de descargar.</p>
      </div>
      <TrackedCtaLink
        href={getBlogCreateHref(path)}
        label={label}
        sourcePath={path}
        sourceType="blog"
        trackingLabel="blog_contextual_cta"
        buttonSize="sm"
        buttonClassName="w-full rounded-full border border-white/14 bg-white/[0.04] text-white shadow-none hover:bg-white/[0.08] sm:w-auto"
      />
    </div>
  );
}
