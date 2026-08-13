const JOB_ROLE_BY_PATH: Record<string, string> = {
  "/cv-call-center": "Call center",
  "/cv-para-administrativo": "Administrativo/a",
  "/cv-para-administrativo-sin-experiencia": "Administrativo/a",
  "/cv-para-atencion-al-cliente": "Atención al cliente",
  "/cv-para-atencion-al-cliente-sin-experiencia": "Atención al cliente",
  "/cv-para-cajero": "Cajero/a",
  "/cv-para-cajero-sin-experiencia": "Cajero/a",
  "/cv-para-estudiantes": "Primer empleo",
  "/cv-para-limpieza": "Personal de limpieza",
  "/cv-para-medicos": "Médico/a",
  "/cv-para-mineria": "Minería",
  "/cv-para-operario": "Operario/a de producción",
  "/cv-para-operario-sin-experiencia": "Operario/a de producción",
  "/cv-para-primer-empleo": "Primer empleo",
  "/cv-para-programadores": "Programador/a",
  "/cv-para-recepcionista": "Recepcionista",
  "/cv-para-recepcionista-sin-experiencia": "Recepcionista",
  "/cv-para-repositor": "Repositor/a",
  "/cv-para-seguridad": "Personal de seguridad",
  "/cv-para-seguridad-sin-experiencia": "Personal de seguridad",
  "/cv-para-vendedor": "Vendedor/a",
  "/cv-para-vendedor-sin-experiencia": "Vendedor/a",
  "/curriculum-sin-experiencia": "Primer empleo",
};

export function normalizeCreateRole(value?: string | null) {
  const role = value?.replace(/\s+/g, " ").trim().slice(0, 140);
  return role || null;
}

export function getJobRoleForLanding(path: string) {
  return JOB_ROLE_BY_PATH[path] ?? null;
}

export function getJobCreateHref(path: string) {
  const params = new URLSearchParams({ intent: "job-specific" });
  const role = getJobRoleForLanding(path);
  if (role) params.set("role", role);
  return `/crear?${params.toString()}`;
}
