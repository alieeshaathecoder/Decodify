import {Flowchart} from "../models/flowchart.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.Decodify_api_key,
});

const generateFlowchart = asyncHandler(async (req, res) => {
    const { input } = req.body;

    if (!input) {
    apiError(400, "Input is required");
  }

    if (!input) {
        throw new apiError(400, "Input is required");
    }

    const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Convert the following input into a Mermaid flowchart.

Rules:
- Use graph TD
- Each node must have SHORT text (max 3 words)
- DO NOT use symbols like < > = { } ( )
- DO NOT include programming code
- Use simple words like "Start", "Check", "Process"
- Use Yes/No for decisions
- DO NOT repeat nodes or connections
- ONLY return Mermaid code
- DO NOT use backticks
- Do NOT use numbers or symbols as edge labels
- Only use "Yes" or "No" for conditions

Input:
${input}`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  let chart = completion.choices[0]?.message?.content || "";
  console.log(chart)

 chart = chart
      .replace(/```mermaid/g, "")
    .replace(/```/g, "")
    .replace(/\r/g, "")
    .replace(/\n{2,}/g, "\n")
    .trim();

  res.status(200).json(
    new apiResponse(200, { chart }, "Flowchart generated successfully")
  );

})

export {
    generateFlowchart,
}