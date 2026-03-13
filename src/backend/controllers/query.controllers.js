import asyncHandler from "../utils/asyncHandler.js";
import {Query} from "../models/query.models.js"
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const explainQuery = asyncHandler(async (req, res) => {
  const topic = req.body.topic;

  if (!topic) {
    throw new apiError(400, "Topic is required");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
  Explain the topic "${topic}" in simple language.
  Include:
  - simple explanation
  - one real-life example
  - short summary
  `;

  const result = await model.generateContent(prompt);
  const explanation = result.response.text();

  const query = await Query.create({
    topic,
    explanation,
  });

  return res
    .status(201)
    .json(new apiResponse(201, { query }, "Query explained successfully"));
});

export { explainQuery };
