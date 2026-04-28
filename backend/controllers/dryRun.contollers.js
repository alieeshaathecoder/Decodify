import DryRun from "../models/dryRun.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

const createDryRun = asyncHandler(async (req, res) => {
  const { input } = req.body;

  if (!input) {
    throw new apiError(400, "Input is required");
  }

  let steps = [];

  if (input.includes("function ") && input.includes("{")) {
    const match = input.match(/function\s+(\w+)\s*\((.*?)\)/);
    if (!match) {
      throw new apiError(400, "Invalid function format");
    }

    const funcName = match[1];
    const param = match[2];

    const bodyStart = input.indexOf("{");
    const bodyEnd = input.lastIndexOf("}");
    const bodyLines = input
      .slice(bodyStart + 1, bodyEnd)
      .trim()
      .split("\n");

    // Find function call
    const callStart = input.lastIndexOf(funcName + "(");
    if (callStart === -1) {
      throw new apiError(400, "Function call not found");
    }

    const arg = input.slice(
      callStart + funcName.length + 1,
      input.indexOf(")", callStart)
    ).trim();

    steps.push(`Call function ${funcName} with ${param} = ${arg}`);

    bodyLines.forEach((line) => {
      line = line.trim();

      if (line.includes("console.log")) {
        const content = line.slice(
          line.indexOf("(") + 1,
          line.lastIndexOf(")")
        ).trim();

        const output = content.replaceAll(param, arg);
        steps.push(`Print ${output}`);
      }
    });

    return res
      .status(200)
      .json(new apiResponse(200, steps, "Function dry run success"));
  }

  if (input.includes("for")) {
    const smallBracesStart = input.indexOf("(");
    const smallBracesEnd = input.indexOf(")");

    if (smallBracesStart === -1 || smallBracesEnd === -1) {
      throw new apiError(400, "Invalid for loop syntax");
    }

    const loopContent = input.slice(
      smallBracesStart + 1,
      smallBracesEnd
    );

    const parts = loopContent.split(";").map((p) => p.trim());
    if (parts.length !== 3) {
      throw new apiError(400, "Invalid for loop format");
    }

    // init
    const [left, right] = parts[0].split("=");
    const variable = left.replace(/let|var|const/, "").trim();
    const start = Number(right.trim());

    // condition
    const condition = parts[1];
    let operator;

    if (condition.includes("<=")) operator = "<=";
    else if (condition.includes(">=")) operator = ">=";
    else if (condition.includes("<")) operator = "<";
    else if (condition.includes(">")) operator = ">";

    if (!operator) {
      throw new apiError(400, "Invalid loop condition");
    }

    const end = Number(condition.split(operator)[1].trim());

    // increment
    const change = parts[2];
    let step = 1;

    if (change.includes("++")) step = 1;
    else if (change.includes("--")) step = -1;
    else if (change.includes("+=")) {
      step = Number(change.split("+=")[1]);
    } else if (change.includes("-=")) {
      step = -Number(change.split("-=")[1]);
    }

    if (step === 0) {
      throw new apiError(400, "Invalid loop step");
    }

    // loop body
    const bodyStart = input.indexOf("{");
    const bodyEnd = input.lastIndexOf("}");
    const loopLines = input
      .slice(bodyStart + 1, bodyEnd)
      .trim()
      .split("\n");

    // safer eval alternative
    const safeEval = (expr) => {
      return Function(`"use strict"; return (${expr})`)();
    };

    // loop execution
    for (
      let i = start;
      operator === "<"
        ? i < end
        : operator === "<="
        ? i <= end
        : operator === ">"
        ? i > end
        : i >= end;
      i += step
    ) {
      steps.push(`${variable} = ${i}`);

      let insideIf = false;
      let insideElse = false;
      let conditionResult = false;

      loopLines.forEach((line) => {
        line = line.trim();

        // IF
        if (line.startsWith("if")) {
          insideIf = true;

          const condition = line.slice(
            line.indexOf("(") + 1,
            line.lastIndexOf(")")
          );

          const evalCondition = condition.replaceAll(variable, i);

          try {
            conditionResult = safeEval(evalCondition);
            steps.push(`Check (${condition}) => ${conditionResult}`);
          } catch {
            steps.push("Condition error");
          }
        }

        // ELSE
        else if (line.startsWith("else")) {
          insideElse = true;
        }

        // closing brace
        else if (line.includes("}")) {
          insideIf = false;
          insideElse = false;
        }

        // console.log
        else if (line.includes("console.log")) {
          const content = line.slice(
            line.indexOf("(") + 1,
            line.lastIndexOf(")")
          ).trim();

          const replaced = content.replaceAll(variable, i);

          let output;
          try {
            output = Function(`return ${replaced}`)();
          } catch {
            output = replaced;
          }

          if (insideIf && conditionResult) {
            steps.push(`Print ${output}`);
          } else if (insideElse && !conditionResult) {
            steps.push(`Print ${output}`);
          } else if (!insideIf && !insideElse) {
            steps.push(`Print ${output}`);
          }
        }
      });
    }
  } else {
    throw new apiError(400, "Only 'for' loop or function supported");
  }

  return res
    .status(200)
    .json(new apiResponse(200, steps, "Dry run created"));
});

export { createDryRun };