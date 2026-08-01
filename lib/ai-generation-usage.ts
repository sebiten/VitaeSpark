import "server-only";

import { supabaseAdmin } from "@/utils/supabase/admin";
import {
  estimateAiGenerationCostUsd,
  type CvGenerationModel,
} from "@/lib/ai-generation-model";

type AiGenerationUsageInput = {
  userId?: string | null;
  sessionId?: string | null;
  model: CvGenerationModel;
  inputTokens?: number;
  cachedInputTokens?: number;
  cacheWriteTokens?: number;
  outputTokens?: number;
  success: boolean;
  errorCode?: string | null;
};

export async function recordAiGenerationUsage(
  input: AiGenerationUsageInput,
) {
  const inputTokens = Math.max(0, input.inputTokens ?? 0);
  const cachedInputTokens = Math.max(0, input.cachedInputTokens ?? 0);
  const cacheWriteTokens = Math.max(0, input.cacheWriteTokens ?? 0);
  const outputTokens = Math.max(0, input.outputTokens ?? 0);
  const { error } = await supabaseAdmin.from("ai_generation_usage").insert({
    user_id: input.userId ?? null,
    session_id: input.sessionId ?? null,
    model: input.model,
    input_tokens: inputTokens,
    cached_input_tokens: cachedInputTokens,
    output_tokens: outputTokens,
    estimated_cost_usd: estimateAiGenerationCostUsd({
      model: input.model,
      inputTokens,
      cachedInputTokens,
      cacheWriteTokens,
      outputTokens,
    }),
    success: input.success,
    error_code: input.errorCode ?? null,
  });

  if (error) {
    console.error("No se pudo registrar el uso de OpenAI:", error);
  }
}
