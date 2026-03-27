import DryRun from "../models/dryRun.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

const createDryRun = asyncHandler(async (req, res) => {
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

  let steps = [];
  for (let i = parsedData.start; i < parsedData.end; i++) {
    steps.push(`i = ${i}`);
    parsedData.loopLines.forEach((line) => {
      if (line.includes("console.log(i)")) {
        const startIndex = line.indexOf("(");
        const endIndex = line.lastIndexOf(")");
        const contentInsideLog = line.slice(startIndex + 1, endIndex).trim();
        if (contentInsideLog === parsedData.variable) {
          steps.push(`Print ${i}`);
        }
      }
    });
  }

  res
    .status(200)
    .json(new apiResponse(200, steps, "Dry run created successfully"));
});

export { createDryRun };
