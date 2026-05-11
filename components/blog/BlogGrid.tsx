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
                className="group relative min-h-[200px] flex flex-col justify-between rounded-xl border border-white/[0.06] bg-[#1C1C22] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-white/40">
                      {post.category}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-semibold leading-snug text-white/90 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/50 line-clamp-2">
                    {post.description}
                  </p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-white/40 transition group-hover:text-white/60">
                  Leer guia
                  <ArrowUpRight className="h-3.5 w-3.5" />
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