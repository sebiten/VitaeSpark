"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, X } from "lucide-react";
import type { BlogPost } from "@/data/blog-posts";

type Props = {
  posts: BlogPost[];
  onFilter: (filtered: BlogPost[]) => void;
};

const DEBOUNCE_MS = 300;

export function BlogFilters({ posts, onFilter }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const extraCategories = [
    "Sin experiencia",
    "Administrativo",
    "Recepcionista",
    "Call center",
    "Cajero",
    "Mineria",
    "Seguridad",
    "Limpieza",
    "Vendedor",
    "Operario",
  ];

  const categories = useMemo(() => {
    const cats = new Set([...posts.map((p) => p.category), ...extraCategories]);
    return Array.from(cats).sort();
  }, [posts]);

  const filterPosts = useCallback(
    (searchTerm: string, category: string | null) => {
      let filtered = posts;

      if (category) {
        filtered = filtered.filter((p) => p.category === category);
      }

      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
      }

      onFilter(filtered);
    },
    [posts, onFilter]
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      filterPosts(value, activeCategory);
    }, DEBOUNCE_MS);

    setDebounceTimer(timer);
  };

  const handleCategoryClick = (category: string | null) => {
    const newCategory = category === activeCategory ? null : category;
    setActiveCategory(newCategory);
    filterPosts(search, newCategory);
  };

  const clearSearch = () => {
    setSearch("");
    filterPosts("", activeCategory);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Buscar en las guias..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-xl border border-white/[0.08] bg-[#1C1C22] py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/50 focus:border-[#7C3AED]/40 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/20"
          />
          {search && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            activeCategory === null
              ? "bg-[#7C3AED] text-white"
              : "border border-white/[0.08] bg-white/[0.04] text-white/60 hover:border-[#7C3AED]/40 hover:text-white/80"
          }`}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-[#7C3AED] text-white"
                : "border border-white/[0.08] bg-white/[0.04] text-white/60 hover:border-[#7C3AED]/40 hover:text-white/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}