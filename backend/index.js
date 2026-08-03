import express from "express";
import cors from "cors";
// import redisClient from "./redisClient.js";
import { resolveQueryEntities } from "./9_entityResolver.js";
import { classifyQuery } from "./10_queryClassifier.js";
import { handleGraphQuery } from "./11_graphHandler.js";
import { handleSimilarityQuery } from "./12_similarityHandler.js";
import authRouter from "./auth/Routes.js";
import connectDB from "./db.js";
import dotenv from 'dotenv'
import authMiddleware from "./auth/middleware/authMiddleware.js";
const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRouter);
  connectDB()
app.post("/query", authMiddleware,async (req, res) => {
  try {
    const { query } = req.body;

    if (!query?.trim()) {
      return res.json({
        answer: "Please enter a movie question."
      });
    }

    console.log("Query:", query);

    const resolved = await resolveQueryEntities(query);
    const classification = await classifyQuery(query, resolved);

    console.log("Type:", classification.type);

    let answer;

    if (classification.type === "similarity") {
      answer = await handleSimilarityQuery(query, resolved);
    } else {
      answer = await handleGraphQuery(query, resolved);
    }

    // Redis caching (ONLY if enabled)
    // await redisClient.set(query, answer, { EX: 3600 });

    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      answer: "Server error"
    });
  }
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});