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
        content: `You are an expert programming teacher.

Analyze the following code:
"${input}"

Explain the code in simple points for beginners. Describe what each part does. Then show the program flow in simple steps like a flowchart (Start → … → End). Keep explanations short, clear, and point-wise. Do not include extra lines, long paragraphs, headings, execution steps, mistakes, complexity, or filler text.

Don't include any comments in the code
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
