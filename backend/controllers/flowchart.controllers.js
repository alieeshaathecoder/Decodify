import { Flowchart } from "../models/flowchart.models.js";
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
    apiError(400, "Input is required");
  }

  if (input.includes("for")) {
  } else {
    apiError(400, "Input must contain a for loop");
  }

  const smallBracesStart = input.indexOf("(");
  const smallBracesEnd = input.indexOf(")");

  const loopContent = input.slice(smallBracesStart + 1, smallBracesEnd);

  const trimedPart = loopContent.split(";").map((part) => part.trim());

  const [left, right] = trimedPart[0].split("=");

  const variable = left.trim();
  const start = Number(right.trim());

  const condition = trimedPart[1].trim();

  let operator;
  if (condition.includes("<=")) operator = "<=";
  else if (condition.includes("<")) operator = "<";
  else if (condition.includes(">=")) operator = ">=";
  else if (condition.includes(">")) operator = ">";

  const end = Number(condition.split(operator)[1].trim());

  let increment, decrement;
  const changeInVar = trimedPart[2].trim();
  if (changeInVar.includes("++")) increment = +1;
  else if (changeInVar.includes("--")) decrement = -1;

  const curlyBracesStart = input.indexOf("{");
  const curlyBracesEnd = input.lastIndexOf("}");

  const loopBody = input.slice(curlyBracesStart + 1, curlyBracesEnd).trim();
  const loopLines = loopBody.split("\n");

  const parsedData = {
    variable,
    start,
    operator,
    end,
    increment,
    decrement,
    loopLines,
  };

  function sanitize(text) {
    return text
      .replace(/"/g, "'") // remove double quotes
      .replace(/</g, "&lt;") // escape <
      .replace(/>/g, "&gt;"); // escape >
  }

  function formatLine(line) {
    line = line.trim();

    if (line.includes("console.log")) {
      return (
        "Print " + line.slice(line.indexOf("(") + 1, line.lastIndexOf(")"))
      );
    }

    if (line.includes("=")) {
      return "Assign " + line;
    }

    return line;
  }


    const init = sanitize(`${parsedData.variable} = ${parsedData.start}`);
    const conditionCheck = sanitize(`${parsedData.variable} ${parsedData.operator} ${parsedData.end}`);
    const body = sanitize(formatLine(parsedData.loopLines[0]));
    const incrementStep = sanitize(
      `${parsedData.variable}${parsedData.increment === 1 ? "++" : "--"}`,
    );

    const chart = `
flowchart TD

Start(["Start"]) --> A["${init}"]
A --> B{"${conditionCheck}?"}

B -->|Yes| C["${body}"]
C --> D["${incrementStep}"]
D --> B

B -->|No| E(["End"])
`;

    return chart;
    res
      .status(200)
      .json(new apiResponse(200, { chart }, "Flowchart generated successfully"));
  });
  

  //   let chart = `
  // flowchart TD
  // Start([Start]) --> A[${parsedData.variable} = ${parsedData.start}]
  // A --> B{${parsedData.variable} ${parsedData.operator} ${parsedData.end}?}
  // B -->|Yes| C[${parsedData.loopLines[0].trim()}]
  // C --> D[${parsedData.variable}${parsedData.increment === 1 ? "++" : "--"}]
  // D --> B
  // B -->|No| E([End])
  // `;

  //     if (!input) {
  //         throw new apiError(400, "Input is required");
  //     }

  //     const completion = await groq.chat.completions.create({
  //     messages: [
  //       {
  //         role: "user",
  //         content: `Convert the following input into a Mermaid flowchart.

  // Rules:
  // - Use graph TD
  // - Each node must have SHORT text (max 3 words)
  // - DO NOT use symbols like < > = { } ( )
  // - DO NOT include programming code
  // - Use simple words like "Start", "Check", "Process"
  // - Use Yes/No for decisions
  // - DO NOT repeat nodes or connections
  // - ONLY return Mermaid code
  // - DO NOT use backticks
  // - Do NOT use numbers or symbols as edge labels
  // - Only use "Yes" or "No" for conditions

  // Input:
  // ${input}`,
  //       },
  //     ],
  //     model: "llama-3.3-70b-versatile",
  //   });

  //   let chart = completion.choices[0]?.message?.content || "";
  //   console.log(chart)

  // chart = chart
  //   .replace(/```mermaid/g, "")
  //   .replace(/```/g, "")
  //   .replace(/\r/g, "")
  //   .replace(/\n{2,}/g, "\n")
  //   .trim();


export { generateFlowchart };
