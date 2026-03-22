import {Flowchart} from "../models/flowchart.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

const generateFlowchart = asyncHandler(async (req, res) => {
    const { input } = req.body;

    if (!input) {
        throw new apiError(400, "Input is required");
    }

    const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Convert the following input into a Mermaid flowchart.

Rules:
- Use "graph TD"
- Keep node text short (2 to 4 words)
- Avoid special characters like (), {}, :, ;
- Use decision nodes (diamonds) where needed
- Do NOT include explanations
- Do NOT include backticks
- ONLY return Mermaid code

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
    .trim();

  res.status(200).json(
    new apiResponse(200, { chart }, "Flowchart generated successfully")
  );

})

export {
    generateFlowchart,
}