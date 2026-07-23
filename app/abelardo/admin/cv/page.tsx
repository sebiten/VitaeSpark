import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  FileText,
  FilterX,
  Search,
} from "lucide-react";
import { CVCard } from "@/components/cvCard";
import { Button } from "@/components/ui/button";
import { CV_TEMPLATES } from "@/lib/cv-templates";
import { loadAdminCvs } from "@/lib/admin-cvs";
import { createClient } from "@/utils/supabase/server";

const PAGE_SIZE = 12;
const STATUS_OPTIONS = [
  { value: "all", label: "Todos los estados" },
  { value: "pending", label: "Pendientes" },
  { value: "paid", label: "Pagados" },
] as const;

type SearchParams = {
  page?: string;
  template?: string;
  status?: string;
  search?: string;
};

function parsePage(value?: string) {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function buildHref(params: SearchParams, page: number) {
  const query = new URLSearchParams();
  if (page > 1) query.set("page", String(page));
  if (params.template && params.template !== "all") {
    query.set("template", params.template);
  }
  if (params.status && params.status !== "all") {
    query.set("status", params.status);
  }
  if (params.search?.trim()) query.set("search", params.search.trim());

  const serialized = query.toString();
  return serialized
    ? `/abelardo/admin/cv?${serialized}`
    : "/abelardo/admin/cv";
}

export default async function AdminCvsPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("isadmin")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.isadmin) redirect("/");

  const params = (await searchParams) ?? {};
  const page = parsePage(params.page);
  const template = CV_TEMPLATES.some((item) => item.id === params.template)
    ? params.template!
    : "all";
  const status = STATUS_OPTIONS.some((item) => item.value === params.status)
    ? params.status!
    : "all";
  const search = params.search?.trim() ?? "";

  const { cvs, total } = await loadAdminCvs({
    page,
    pageSize: PAGE_SIZE,
    template,
    status,
    search,
  });
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const normalizedParams = { template, status, search };

  if (total > 0 && page > totalPages) {
    redirect(buildHref(normalizedParams, totalPages));
  }

  const currentPage = Math.min(page, totalPages);
  const hasFilters = Boolean(
    search || template !== "all" || status !== "all",
  );

  return (
    <main className="min-h-screen bg-[#0C0C10] px-4 py-8 text-[#F6F2EA] sm:px-6 lg:py-12">
      <div className="mx-auto w-full max-w-[1440px]">
        <Link
          href="/abelardo/admin"
          className="inline-flex items-center gap-2 text-sm text-white/52 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
          Volver al panel
        </Link>

        <header className="mt-6 border-b border-white/8 pb-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
                <FileText className="size-4" />
                Biblioteca de CVs
              </div>
              <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Currículums generados
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/54">
                Revisá el contenido, la plantilla, la foto y el estado de cada
                CV sin salir del panel.
              </p>
            </div>

            <div className="flex items-baseline gap-2 lg:text-right">
              <strong className="text-3xl font-semibold tabular-nums text-white">
                {total}
              </strong>
              <span className="text-sm text-white/46">
                {total === 1 ? "resultado" : "resultados"}
              </span>
            </div>
          </div>
        </header>

        <form
          action="/abelardo/admin/cv"
          className="mt-6 grid gap-3 border-b border-white/8 pb-6 md:grid-cols-[minmax(260px,1fr)_220px_190px_auto]"
        >
          <label className="relative">
            <span className="sr-only">Buscar currículums</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35" />
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Nombre, puesto, usuario o ID"
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.035] pl-10 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/32 focus:border-[#8B5CF6]/55"
            />
          </label>

          <label>
            <span className="sr-only">Filtrar por plantilla</span>
            <select
              name="template"
              defaultValue={template}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#15151A] px-3 text-sm text-white/78 outline-none focus:border-[#8B5CF6]/55"
            >
              <option value="all">Todas las plantillas</option>
              {CV_TEMPLATES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filtrar por estado</span>
            <select
              name="status"
              defaultValue={status}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#15151A] px-3 text-sm text-white/78 outline-none focus:border-[#8B5CF6]/55"
            >
              {STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="h-11 flex-1 bg-[#F6F2EA] px-5 text-[#111115] hover:bg-white"
            >
              Buscar
            </Button>
            {hasFilters ? (
              <Button
                asChild
                type="button"
                variant="outline"
                className="size-11 border-white/10 bg-transparent px-0 text-white/58 hover:bg-white/[0.05] hover:text-white"
              >
                <Link href="/abelardo/admin/cv" aria-label="Limpiar filtros">
                  <FilterX className="size-4" />
                </Link>
              </Button>
            ) : null}
          </div>
        </form>

        <section className="mt-7" aria-labelledby="cv-results-title">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 id="cv-results-title" className="text-sm font-semibold text-white/88">
                {hasFilters ? "Resultados filtrados" : "CVs más recientes"}
              </h2>
              <p className="mt-1 text-xs text-white/40">
                Página {currentPage} de {totalPages}
              </p>
            </div>
          </div>

          {cvs.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {cvs.map((cv) => (
                <CVCard key={cv.id} cv={cv} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.018] px-6 text-center">
              <div className="flex size-11 items-center justify-center rounded-xl border border-white/8 bg-white/[0.035] text-white/42">
                <FileSearch className="size-5" />
              </div>
              <h2 className="mt-4 text-base font-semibold">
                No encontramos currículums
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/48">
                {hasFilters
                  ? "Probá con otro nombre, plantilla o estado."
                  : "Todavía no hay CVs registrados en la plataforma."}
              </p>
              {hasFilters ? (
                <Link
                  href="/abelardo/admin/cv"
                  className="mt-4 text-sm font-semibold text-[#A78BFA] hover:text-[#C4B5FD]"
                >
                  Ver todos los CVs
                </Link>
              ) : null}
            </div>
          )}
        </section>

        {totalPages > 1 ? (
          <nav
            className="mt-8 flex items-center justify-between border-t border-white/8 pt-5"
            aria-label="Paginación de currículums"
          >
            <Button
              asChild={currentPage > 1}
              variant="outline"
              disabled={currentPage <= 1}
              className="border-white/10 bg-transparent text-white/68 hover:bg-white/[0.05] hover:text-white"
            >
              {currentPage > 1 ? (
                <Link href={buildHref(normalizedParams, currentPage - 1)}>
                  <ChevronLeft className="mr-2 size-4" />
                  Anterior
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="mr-2 size-4" />
                  Anterior
                </span>
              )}
            </Button>

            <span className="text-xs tabular-nums text-white/42">
              {currentPage} / {totalPages}
            </span>

            <Button
              asChild={currentPage < totalPages}
              variant="outline"
              disabled={currentPage >= totalPages}
              className="border-white/10 bg-transparent text-white/68 hover:bg-white/[0.05] hover:text-white"
            >
              {currentPage < totalPages ? (
                <Link href={buildHref(normalizedParams, currentPage + 1)}>
                  Siguiente
                  <ChevronRight className="ml-2 size-4" />
                </Link>
              ) : (
                <span>
                  Siguiente
                  <ChevronRight className="ml-2 size-4" />
                </span>
              )}
            </Button>
          </nav>
        ) : null}
      </div>
    </main>
  );
}
