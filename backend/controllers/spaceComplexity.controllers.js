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
        content: `You are a DSA tutor.

Analyze the given code and return a very short answer.

Output format:
- First line: Space Complexity in Big-O notation
- Next 1 to 2 lines: Short explanation of how space is used

Rules:
- Keep total output under 3 lines
- No headings
- No bullet points
- No comments
- No extra text
- Mention auxiliary space only
- Include recursion stack if present

Code:
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
