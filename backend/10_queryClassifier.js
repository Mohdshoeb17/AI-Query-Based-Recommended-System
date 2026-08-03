import { llm } from "./2_config.js";

async function classifyQuery(query, resolvedEntities) {
  // Build entity context string for the LLM
  const entityContext = resolvedEntities.entities.length > 0
    ? resolvedEntities.entities
        .map((e) => `"${e.searchTerm}" is a ${e.label} (full name: "${e.nodeName}")`)
        .join("\n")
    : "No entities were found in the database.";

  const unresolvedContext = resolvedEntities.unresolved.length > 0
    ? `\nThese terms were NOT found in the database: ${resolvedEntities.unresolved.join(", ")}`
    : "";

  const prompt = `You are a query classifier for a movie knowledge graph.

RESOLVED ENTITIES (we already looked these up in the database):
${entityContext}${unresolvedContext}

CLASSIFY the query as ONE of:

1. "graph" — anything that can be answered from structured data:
   - Finding movies/actors/directors based on specific criteria
   - Getting information about a specific entity
   - Finding how two entities are related
   - Counting, listing, filtering
   - Examples: "Movies directed by [Director]", "Tell me about [Movie]",
     "How is [Actor] related to [Director]?", "Action movies with [Actor]"

2. "similarity" — finding similar or recommended items based on taste:
   - The query explicitly asks for "similar", "like", "recommend"
   - The user wants to discover new things based on something they liked
   - Examples: "Movies like [Movie]", "Recommend something similar to [Movie]",
     "I liked [Movie], what else should I watch?"

Respond ONLY with JSON: {"type": "graph" or "similarity", "reasoning": "one sentence"}
No markdown, no backticks.`;

  const response = await llm.invoke([
    { role: "system", content: prompt },
    { role: "human", content: query },
  ]);

  let raw = response.content;
  if (Array.isArray(raw)) {
    raw = raw
      .filter((block) => typeof block === "string" || block.type === "text")
      .map((block) => (typeof block === "string" ? block : block.text))
      .join("\n");
  }
  raw = raw.trim().replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn(" Classification failed, defaulting to graph");
    return { type: "graph", reasoning: "Default fallback" };
  }
}

export { classifyQuery };
