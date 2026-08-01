import "server-only";

import { supabaseAdmin } from "@/utils/supabase/admin";

const GPT_4O_INPUT_PER_MILLION = 2.5;
const GPT_4O_CACHED_INPUT_PER_MILLION = 1.25;
const GPT_4O_OUTPUT_PER_MILLION = 10;

type AiGenerationUsageInput = {
  userId?: string | null;
  sessionId?: string | null;
  model: "gpt-4o";
  inputTokens?: number;
  cachedInputTokens?: number;
  outputTokens?: number;
  success: boolean;
  errorCode?: string | null;
};

export function estimateGpt4oCostUsd({
  inputTokens = 0,
  cachedInputTokens = 0,
  outputTokens = 0,
}: Pick<
  AiGenerationUsageInput,
  "inputTokens" | "cachedInputTokens" | "outputTokens"
>) {
  const cached = Math.min(inputTokens, Math.max(0, cachedInputTokens));
  const uncached = Math.max(0, inputTokens - cached);

  return (
    (uncached * GPT_4O_INPUT_PER_MILLION +
      cached * GPT_4O_CACHED_INPUT_PER_MILLION +
      outputTokens * GPT_4O_OUTPUT_PER_MILLION) /
    1_000_000
  );
}

export async function recordAiGenerationUsage(
  input: AiGenerationUsageInput,
) {
  const inputTokens = Math.max(0, input.inputTokens ?? 0);
  const cachedInputTokens = Math.max(0, input.cachedInputTokens ?? 0);
  const outputTokens = Math.max(0, input.outputTokens ?? 0);
  const { error } = await supabaseAdmin.from("ai_generation_usage").insert({
    user_id: input.userId ?? null,
    session_id: input.sessionId ?? null,
    model: input.model,
    input_tokens: inputTokens,
    cached_input_tokens: cachedInputTokens,
    output_tokens: outputTokens,
    estimated_cost_usd: estimateGpt4oCostUsd({
      inputTokens,
      cachedInputTokens,
      outputTokens,
    }),
    success: input.success,
    error_code: input.errorCode ?? null,
  });

  if (error) {
    console.error("No se pudo registrar el uso de OpenAI:", error);
  }
}
