import { describe, expect, it } from "vitest";
import {
  getJobCreateHref,
  getJobRoleForLanding,
  normalizeCreateRole,
} from "../lib/job-landing";

describe("contexto de landings profesionales", () => {
  it("conserva el oficio al entrar al creador", () => {
    expect(getJobRoleForLanding("/cv-para-mineria")).toBe("Minería");
    expect(getJobCreateHref("/cv-para-mineria")).toBe(
      "/crear?intent=job-specific&role=Miner%C3%ADa",
    );
  });

  it("mantiene un creador generico para paginas sin oficio", () => {
    expect(getJobCreateHref("/hacer-cv-con-ia")).toBe(
      "/crear?intent=job-specific",
    );
  });

  it("limita valores externos antes de precargar el formulario", () => {
    expect(normalizeCreateRole(`  ${"a".repeat(180)}  `)).toHaveLength(140);
    expect(normalizeCreateRole("   ")).toBeNull();
  });
});
