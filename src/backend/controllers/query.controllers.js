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

Analyze the following code and explain it for beginners.

Code:
"${input}"

Rules for the response:

1. Write the explanation
2. Do NOT add headings like "Line Explanation".
3. Do NOT use square brackets [].
4. After the explanations, describe the program execution steps.
5. Then describe the flow of the program like a flowchart in simple steps.
6. If there are mistakes in the code, list them.
7. Also tell the time complexity and space complexity.

Response format example:

Explanation:
Explain the elements of the code in simple language, tell where the code is used, and what it does.

Execution Steps:
Step 1: explain what happens first
Step 2: explain what happens next

Program Flow:
Start → ...
Condition → ...
Loop → ...
End

Mistakes:
(if none, say "No mistakes found")

Time Complexity:
...

Space Complexity:
...

Explain everything in very simple language suitable for beginners learning programming.`,
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
