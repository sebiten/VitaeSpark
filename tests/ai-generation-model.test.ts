import { describe, expect, it } from "vitest";
import {
  DEFAULT_CV_GENERATION_MODEL,
  estimateAiGenerationCostUsd,
  resolveCvGenerationModel,
} from "../lib/ai-generation-model";

describe("modelo de generación de CV", () => {
  it("usa Luna por defecto y permite rollback a GPT-4o", () => {
    expect(resolveCvGenerationModel()).toBe(DEFAULT_CV_GENERATION_MODEL);
    expect(resolveCvGenerationModel("gpt-5.6-luna")).toBe("gpt-5.6-luna");
    expect(resolveCvGenerationModel("gpt-4o")).toBe("gpt-4o");
    expect(resolveCvGenerationModel("modelo-inválido")).toBe(
      DEFAULT_CV_GENERATION_MODEL,
    );
  });

  it("calcula el costo de GPT-4o", () => {
    expect(
      estimateAiGenerationCostUsd({
        model: "gpt-4o",
        inputTokens: 1_000,
        outputTokens: 500,
      }),
    ).toBeCloseTo(0.0075, 8);
  });

  it("calcula escrituras y lecturas de caché de Luna", () => {
    expect(
      estimateAiGenerationCostUsd({
        model: "gpt-5.6-luna",
        inputTokens: 1_200,
        cacheWriteTokens: 1_200,
        outputTokens: 400,
      }),
    ).toBeCloseTo(0.00078, 8);

    expect(
      estimateAiGenerationCostUsd({
        model: "gpt-5.6-luna",
        inputTokens: 1_200,
        cachedInputTokens: 1_200,
        outputTokens: 400,
      }),
    ).toBeCloseTo(0.000504, 8);
  });
});
