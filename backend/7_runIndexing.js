import { extractAllEntities } from "./4_entityExtractor.js";
import { buildGraph } from "./5_graphBuilder.js";
import { buildVectorStore } from "./6_vectorStore.js";
import { closeConnections } from "./2_config.js";
async function runIndexing(pdfPath) {
  console.log("GraphRAG Indexing Pipeline");
  const startTime = Date.now();
  try {
    // ── STEP 1: Extract Entities from PDF (Gemini) ──
    console.log("── STEP 1: Extracting Entities (Gemini + PDF Upload) ──");
    const entities = await extractAllEntities(pdfPath);

    // ── STEP 2: Build Neo4j Graph──
    console.log("\n── STEP 2: Building Graph (Neo4j) ──");
    await buildGraph(entities);
    // ── STEP 3: Build Vector Store (Parse PDF → Chunk → Embed → Pinecone) ──
    console.log("\n── STEP 3: Building Vector Store (Pinecone) ──");
    await buildVectorStore(pdfPath);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log("\n===========================================");
    console.log(`   Indexing complete in ${elapsed}s`);
    console.log("===========================================");
  } catch (err) {
    console.error("\n Indexing failed:", err.message);
    console.error(err.stack);
  } finally {
    await closeConnections();
  }
}

const pdfPath = './data/movies.pdf';
if (!pdfPath) {
  console.error("Usage: npm run index -- ./data/movies.pdf");
  process.exit(1);
}

runIndexing(pdfPath);
