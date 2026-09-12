import TimeComplexity from "../models/timeComplexity.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateTimeComplexity = asyncHandler(async (req, res) => {
     const { input } = req.body;

  if (!input) {
    throw new apiError(400, "Input is required");
  }

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are a DSA tutor.

Analyze the given code and return a very short answer.

Output format:
- Time Complexity in Big-O notation
- Short explanation of how time grows

Rules:
- Keep total output under 5-6 lines
- No headings
- No bullet points
- No comments
- No extra text
- Clearly relate time to input size n
- Mention loops or recursion briefly

Code:
${input}`,
      },
    ],
    model: "openai/gpt-oss-120b",
  });

  const timeComplexity = new TimeComplexity({
    input,
    complexity: completion.choices[0].message.content,
  });

  res.status(201).json(new apiResponse(201, timeComplexity, "Time complexity generated successfully"));
});

export {
    generateTimeComplexity,
}