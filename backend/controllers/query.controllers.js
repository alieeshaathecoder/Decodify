import { Query } from "../models/query.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

const explainQuery = asyncHandler(async (req, res) => {
  const { input } = req.body;

  if (!input) {
    throw new apiError(400, "Input is required");
  }

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are a programming teacher.

Analyze the given code and respond in a very short and structured format.

Output format:

Explanation:
- Max 4 points only
- Each point must be 1 short sentence

Steps:
- Max 6 steps only
- Each step must be very short (3–6 words)

Flow:
- One single line only
- Format: Start → ... → End

Rules:
- Keep everything concise
- Do NOT write paragraphs
- Do NOT repeat information
- Do NOT include code
- Do NOT include extra text
- Do not include any comments or headings

Code:
"${input}"
`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const explanation = completion.choices[0].message.content;

  const query = await Query.create({
    input,
    explanation,
  });

  return res
    .status(201)
    .json(new apiResponse(201, query, "Topic explained successfully"));
});

export { explainQuery };
