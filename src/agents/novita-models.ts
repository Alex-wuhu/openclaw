import type { ModelDefinitionConfig } from "../config/types.models.js";

export const NOVITA_BASE_URL = "https://api.novita.ai/openai";

/**
 * Static seed catalog — used as a fallback while the dynamic API fetch is
 * in-flight. Once the Novita API responds, the full 90+ model catalog
 * replaces this list. Pricing is omitted (set to 0) because the API provides
 * real-time pricing; these seeds exist only to ensure at least a few models
 * are immediately available.
 */
const NOVITA_DEFAULT_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

export const NOVITA_MODEL_CATALOG: ModelDefinitionConfig[] = [
  {
    id: "deepseek/deepseek-v3.2",
    name: "DeepSeek V3.2",
    reasoning: false,
    input: ["text"],
    contextWindow: 163840,
    maxTokens: 16384,
    cost: NOVITA_DEFAULT_COST,
  },
  {
    id: "deepseek/deepseek-r1-0528",
    name: "DeepSeek R1 0528",
    reasoning: true,
    input: ["text"],
    contextWindow: 163840,
    maxTokens: 65536,
    cost: NOVITA_DEFAULT_COST,
  },
  {
    id: "meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout 17B",
    reasoning: false,
    input: ["text", "image"],
    contextWindow: 131072,
    maxTokens: 8192,
    cost: NOVITA_DEFAULT_COST,
  },
];

export function buildNovitaModelDefinition(
  model: (typeof NOVITA_MODEL_CATALOG)[number],
): ModelDefinitionConfig {
  return {
    ...model,
    api: "openai-completions",
  };
}
