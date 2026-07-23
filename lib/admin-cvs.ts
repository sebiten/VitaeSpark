import "server-only";

import type { CV } from "@/lib/types/cv";
import { supabaseAdmin } from "@/utils/supabase/admin";

export type AdminCvRecord = {
  id: string;
  profile_id: string;
  cv_data: CV;
  template: string | null;
  status: string | null;
  created_at: string;
  user_name: string | null;
};

type AdminCvRow = {
  id: string;
  profile_id: string;
  cv_data: unknown;
  foto_url: string | null;
  template: string | null;
  status: string | null;
  created_at: string;
};

type ProfileRow = {
  id: string;
  full_name: string | null;
};

type LoadAdminCvsOptions = {
  page: number;
  pageSize: number;
  template?: string;
  status?: string;
  search?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getTrustedPhotoUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;

  try {
    const photoUrl = new URL(value);
    const supabaseUrl = new URL(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://invalid.local",
    );
    const isProfilePhoto =
      photoUrl.origin === supabaseUrl.origin &&
      photoUrl.pathname.startsWith(
        "/storage/v1/object/public/fotos-perfil/",
      );

    return isProfilePhoto ? photoUrl.toString() : undefined;
  } catch {
    return undefined;
  }
}

function normalizeCvData(value: unknown, fallbackPhoto: string | null): CV {
  const cvData = isRecord(value) ? value : {};
  const embeddedPhoto = getTrustedPhotoUrl(cvData.foto_url);
  const columnPhoto = getTrustedPhotoUrl(fallbackPhoto);

  return {
    ...cvData,
    foto_url: embeddedPhoto ?? columnPhoto,
  } as unknown as CV;
}

export async function loadAdminCvs({
  page,
  pageSize,
  template = "all",
  status = "all",
  search = "",
}: LoadAdminCvsOptions) {
  const normalizedSearch = search.trim().toLocaleLowerCase("es");
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabaseAdmin
    .from("cvs")
    .select(
      "id, profile_id, cv_data, foto_url, created_at, template, status",
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (template !== "all") {
    query = query.eq("template", template);
  }

  if (status !== "all") {
    query = query.eq("status", status);
  }

  query = normalizedSearch ? query.limit(500) : query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`No se pudieron cargar los CVs: ${error.message}`);
  }

  const rows = (data ?? []) as AdminCvRow[];
  const profileIds = [...new Set(rows.map((row) => row.profile_id))];
  let profiles: ProfileRow[] = [];

  if (profileIds.length > 0) {
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name")
      .in("id", profileIds);

    if (profileError) {
      console.error("No se pudieron cargar los perfiles del admin:", profileError);
    } else {
      profiles = (profileData ?? []) as ProfileRow[];
    }
  }

  const profileNames = new Map(
    profiles.map((profile) => [profile.id, profile.full_name]),
  );

  const normalizedRows: AdminCvRecord[] = rows.map((row) => ({
    id: row.id,
    profile_id: row.profile_id,
    cv_data: normalizeCvData(row.cv_data, row.foto_url),
    template: row.template,
    status: row.status,
    created_at: row.created_at,
    user_name: profileNames.get(row.profile_id) ?? null,
  }));

  const filteredRows = normalizedSearch
    ? normalizedRows.filter((cv) =>
        [
          cv.cv_data.nombre,
          cv.cv_data.puesto,
          cv.template,
          cv.user_name,
          cv.profile_id,
        ].some((value) =>
          String(value ?? "")
            .toLocaleLowerCase("es")
            .includes(normalizedSearch),
        ),
      )
    : normalizedRows;

  return {
    cvs: normalizedSearch
      ? filteredRows.slice(from, from + pageSize)
      : filteredRows,
    total: normalizedSearch ? filteredRows.length : (count ?? filteredRows.length),
    page,
    pageSize,
  };
}
