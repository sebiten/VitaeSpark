"use client";

import Link from "next/link";
import { useDeferredValue, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";
import { iconMap } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

type Props = {
  posts: BlogPost[];
};

type TopicId = "all" | "start" | "improve" | "ats" | "examples" | "jobs";

const topics: Array<{ id: TopicId; label: string }> = [
  { id: "all", label: "Todas" },
  { id: "start", label: "Empezar un CV" },
  { id: "improve", label: "Mejorar contenido" },
  { id: "ats", label: "ATS" },
  { id: "examples", label: "Ejemplos" },
  { id: "jobs", label: "CV por puesto" },
];

export function BlogGrid({ posts }: Props) {
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState<TopicId>("all");
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      deferredSearch.length === 0 ||
      `${post.title} ${post.description} ${post.category}`
        .toLowerCase()
        .includes(deferredSearch);
    return matchesSearch && matchesTopic(post, activeTopic);
  });

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <div>
      <div className="border-y border-white/10 py-5">
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/36" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar una guía o un puesto"
            aria-label="Buscar en las guías"
            className="h-12 w-full rounded-full border border-white/10 bg-white/[0.035] pl-11 pr-11 text-sm text-white outline-none placeholder:text-white/34 focus:border-[#A78BFA]/40 focus:ring-4 focus:ring-[#A78BFA]/8"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-white/42 transition hover:bg-white/8 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {topics.map((topic) => (
            <button
              key={topic.id}
              type="button"
              aria-pressed={activeTopic === topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
                activeTopic === topic.id
                  ? "border-[#A78BFA]/35 bg-[#A78BFA]/12 text-white"
                  : "border-white/8 bg-transparent text-white/52 hover:border-white/16 hover:text-white/78",
              )}
            >
              {topic.label}
            </button>
          ))}
        </div>
      </div>

      {featuredPost ? (
        <div className="mt-8" aria-live="polite">
          <FeaturedGuide post={featuredPost} />
          {remainingPosts.length > 0 ? (
            <div className="mt-4 grid gap-x-8 md:grid-cols-2">
              {remainingPosts.map((post) => (
                <GuideRow key={post.href} post={post} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="border-b border-white/10 py-16 text-center" aria-live="polite">
          <p className="text-white/62">No encontramos una guía con esa búsqueda.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveTopic("all");
            }}
            className="mt-3 text-sm font-medium text-[#A78BFA] transition hover:text-white"
          >
            Ver todas las guías
          </button>
        </div>
      )}
    </div>
  );
}

function FeaturedGuide({ post }: { post: BlogPost }) {
  const Icon = iconMap[post.iconKey];

  return (
    <Link
      href={post.href}
      className="group grid gap-6 border-b border-white/10 pb-8 sm:grid-cols-[64px_1fr_auto] sm:items-center"
    >
      <div className="flex size-14 items-center justify-center rounded-2xl border border-[#A78BFA]/18 bg-[#A78BFA]/8 text-[#C4B5FD]">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A78BFA]">
          Guía destacada · {post.category}
        </p>
        <h2 className="mt-2 text-balance text-2xl font-semibold tracking-[-0.035em] text-white/92 transition group-hover:text-white sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/54">
          {post.description}
        </p>
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/64 transition group-hover:text-white">
        Leer guía
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

function GuideRow({ post }: { post: BlogPost }) {
  const Icon = iconMap[post.iconKey];

  return (
    <Link href={post.href} className="group grid grid-cols-[40px_1fr] gap-4 border-b border-white/10 py-6">
      <div className="flex size-9 items-center justify-center rounded-xl bg-white/[0.035] text-white/48 transition group-hover:bg-[#A78BFA]/10 group-hover:text-[#C4B5FD]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div>
        <p className="text-[11px] font-medium text-white/38">{post.category}</p>
        <h2 className="mt-1 text-base font-semibold leading-6 text-white/80 transition group-hover:text-white">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/46">
          {post.description}
        </p>
      </div>
    </Link>
  );
}

function matchesTopic(post: BlogPost, topic: TopicId) {
  if (topic === "all") return true;
  if (topic === "jobs") return !post.href.startsWith("/blog/");
  if (topic === "ats") return /ats/i.test(`${post.title} ${post.category}`);
  if (topic === "examples") return /ejemplo/i.test(`${post.title} ${post.category}`);
  if (topic === "start") {
    return /(guia base|contenido|primer empleo)/i.test(post.category);
  }
  return /(habilidades|perfil|mejora|errores|profesional|vacantes)/i.test(
    post.category,
  );
}
