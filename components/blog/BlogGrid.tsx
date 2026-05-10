"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";
import { iconMap } from "@/data/blog-posts";
import { BlogFilters } from "./BlogFilters";
import { useState } from "react";

type Props = {
  posts: BlogPost[];
};

export function BlogGrid({ posts }: Props) {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);

  return (
    <>
      <div className="mb-8">
        <BlogFilters posts={posts} onFilter={setFilteredPosts} />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filteredPosts.map((post, index) => {
            const Icon = iconMap[post.iconKey];

            return (
              <Link
                key={post.href}
                href={post.href}
                className="group relative min-h-[206px] overflow-hidden rounded-3xl border border-white/10 bg-[#121217] p-6 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#38BDF8]/40 hover:bg-[#15151B]"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7C3AED]/10 blur-2xl transition group-hover:bg-[#38BDF8]/10" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent opacity-0 transition group-hover:opacity-100" />

                <div className="relative mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-[#38BDF8]/10 p-3 text-[#38BDF8] ring-1 ring-[#38BDF8]/15 transition group-hover:bg-[#7C3AED]/15 group-hover:text-[#A78BFA]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60">
                      {post.category}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="relative text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {post.title}
                </h2>
                <p className="relative mt-3 text-sm leading-7 text-white/75 sm:text-base">
                  {post.description}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8]">
                  Leer guia
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#121217] py-16 text-center">
          <p className="text-white/60">
            No se encontraron guias que coincidan con tu busqueda.
          </p>
        </div>
      )}
    </>
  );
}