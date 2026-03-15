import asyncHandler from "../utils/asyncHandler.js";
import { Query } from "../models/query.models.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

const explainQuery = asyncHandler(async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    throw new apiError(400, "Topic is required");
  }

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are a teacher explaining things to a 5-year-old child.

Explain the topic: "${topic}"

Rules:
- Use very simple words.
- Use short sentences.
- Make it easy and fun to understand.
- Avoid technical or complex terms.

Return the response in this format:

Explanation:
Explain the topic in very simple language like teaching a small child.

Example:
Give a real-life example that a child can imagine.

Summary:
Give a very short summary in one or two sentences.

Do NOT include titles like "Simple Explanation", "Example", or "Summary". 
Just write the paragraphs.`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const explanation = completion.choices[0].message.content;

  const query = await Query.create({
    topic,
    explanation,
  });

  return res
    .status(201)
    .json(new apiResponse(201, query, "Topic explained successfully"));
});

export { explainQuery };
