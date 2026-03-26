import SpaceComplexity from "../models/spaceComplexity.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

const generateSpaceComplexity = asyncHandler(async (req, res) => {
  const { input } = req.body;

  if (!input) {
    throw new apiError(400, "Input is required");
  }

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `You are an expert Data Structures and Algorithms tutor.

Your task is to analyze the given code or algorithm and explain its space complexity in a clear and structured way.

Follow this exact format:

1. Space Complexity:
- State the overall time complexity using Big-O notation.

2. Explanation:
- Explain how the time is being used step-by-step.
- Include variables, data structures (arrays, maps, recursion stack, etc.).
- Differentiate between input time and auxiliary time.

3. Auxiliary Space:
- Clearly mention the extra space used (excluding input).

4. Key Insight:
- Give a short 1-2 line intuition to quickly understand the space usage.

5. Optimization (if possible):
- Suggest how space usage can be reduced.

Rules:
- Keep explanations simple and beginner-friendly.
- Avoid unnecessary jargon.
- Be precise and accurate.
- Clearly relate space usage to input size n.
- Mention recursion stack space if recursion is used.

Input:
${input}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const spaceComplexity = new SpaceComplexity({
    input,
    complexity: completion.choices[0].message.content,
  });

  res
    .status(201)
    .json(
      new apiResponse(
        201,
        spaceComplexity,
        "Space complexity generated successfully",
      ),
    );
});

export { generateSpaceComplexity };
