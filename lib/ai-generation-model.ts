export const DEFAULT_CV_GENERATION_MODEL = "gpt-5.6-luna" as const;

export type CvGenerationModel = "gpt-5.6-luna" | "gpt-4o";

const MODEL_PRICING_PER_MILLION: Record<
  CvGenerationModel,
  {
    input: number;
    cachedInput: number;
    cacheWrite: number;
    output: number;
  }
> = {
  "gpt-5.6-luna": {
    input: 0.2,
    cachedInput: 0.02,
    cacheWrite: 0.25,
    output: 1.2,
  },
  "gpt-4o": {
    input: 2.5,
    cachedInput: 1.25,
    cacheWrite: 2.5,
    output: 10,
  },
};

export function resolveCvGenerationModel(
  configuredModel?: string | null,
): CvGenerationModel {
  return configuredModel === "gpt-4o" || configuredModel === "gpt-5.6-luna"
    ? configuredModel
    : DEFAULT_CV_GENERATION_MODEL;
}

export const CV_GENERATION_MODEL = resolveCvGenerationModel(
  process.env.OPENAI_CV_MODEL,
);

export function estimateAiGenerationCostUsd({
  model,
  inputTokens = 0,
  cachedInputTokens = 0,
  cacheWriteTokens = 0,
  outputTokens = 0,
}: {
  model: CvGenerationModel;
  inputTokens?: number;
  cachedInputTokens?: number;
  cacheWriteTokens?: number;
  outputTokens?: number;
}) {
  const rates = MODEL_PRICING_PER_MILLION[model];
  const input = Math.max(0, inputTokens);
  const cached = Math.min(input, Math.max(0, cachedInputTokens));
  const written = Math.min(
    Math.max(0, input - cached),
    Math.max(0, cacheWriteTokens),
  );
  const uncached = Math.max(0, input - cached - written);

  return (
    (uncached * rates.input +
      cached * rates.cachedInput +
      written * rates.cacheWrite +
      Math.max(0, outputTokens) * rates.output) /
    1_000_000
  );
}
