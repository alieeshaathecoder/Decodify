mermaid.initialize({ startOnLoad: false });

const result = document.querySelector("#result");
const flowchartBtn = document.querySelector("#flowchart");
const timeComplexityBtn = document.querySelector("#timeComplexityBtn");
const spaceComplexityBtn = document.querySelector("#spaceComplexityBtn");
const searchBtn = document.getElementById("search");
const dryRunBtn = document.getElementById("dryRun");
const nextStepBtn = document.getElementById("nextStep");

require.config({
  paths: { vs: "https://unpkg.com/monaco-editor@latest/min/vs" },
});

require(["vs/editor/editor.main"], function () {
  monaco.editor.defineTheme("explainifyTheme", {
    base: "vs-dark",
    inherit: true,

    rules: [
      { token: "", foreground: "#ecf0f6" },
      { token: "keyword", foreground: "60A5FA" },
      { token: "string", foreground: "34D399" },
      { token: "comment", foreground: "64748B" },
      { token: "number", foreground: "FBBF24" },
    ],

    colors: {
      "editor.background": "#1E293B",
      "editor.foreground": "#94A3B8",
      "editorLineNumber.foreground": "#64748B",
      "editorCursor.foreground": "#F1F5F9",
      "editor.lineHighlightBackground": "#334155",
    },
  });

  const editorInstance = monaco.editor.create(
    document.getElementById("editor"),
    {
      value: "// Write your code here\n",
      language: "javascript",
      theme: "explainifyTheme",
      fontSize: 17,
      minimap: { enabled: false },
      automaticLayout: true,
    },
  );

  window.editor = editorInstance;
});

searchBtn.addEventListener("click", async () => {
  if (!window.editor) {
    alert("Editor not ready yet");
    return;
  }

  resultContainer.classList.add("show");

  const inputVal = window.editor.getValue().trim();

  const response = await fetch("https://decodify-1.onrender.com/api/v1/topic/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: inputVal,
    }),
  });

  const data = await response.json();

  result.innerHTML = `
      <div class="bg-[#1E293B] p-6 rounded-xl max-w-[80vw]">
        <p id="typingText" class="text-[#94A3B8] leading-relaxed whitespace-pre-line"></p>
      </div>
    `;

  const textElement = document.getElementById("typingText");
  const fullText = data.data.explanation;

  // typing effect (character by character)
  let index = 0;

  function typeEffect() {
    if (index < fullText.length) {
      textElement.innerHTML += fullText.charAt(index);
      index++;
      setTimeout(typeEffect, 50); // speed (lower = faster)
    }
  }

  typeEffect();
});

timeComplexityBtn.addEventListener("click", async () => {
  const inputVal = window.editor.getValue().trim();

  const response = await fetch(
    "https://decodify-1.onrender.com/api/v1/generate/timeComplexity",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: inputVal,
      }),
    },
  );

  const data = await response.json();

  result.innerHTML = `
   <div class="bg-[#1E293B] p-6 rounded-xl max-w-[80vw]">
       <p id="typingText" class="text-[#94A3B8] leading-relaxed whitespace-pre-line">${data.data.complexity}</p>
    </div>
  `;
});

spaceComplexityBtn.addEventListener("click", async () => {
  const inputVal = window.editor.getValue().trim();

  const response = await fetch(
    "https://decodify-1.onrender.com/api/v1/generate/spaceComplexity",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: inputVal,
      }),
    },
  );

  const data = await response.json();

  result.innerHTML = `
<div class="bg-[#1E293B] p-6 rounded-xl max-w-[80vw]">
       <p id="typingText" class="text-[#94A3B8] leading-relaxed whitespace-pre-line">${data.data.complexity}</p>
    </div>
  `;
});

async function generateFlowchart() {
  const input = window.editor.getValue().trim().toString();

  const res = await fetch("https://decodify-1.onrender.com/api/v1/input/flowchart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: input }),
  });

  const data = await res.json();
  renderChart(data.data.chart);
}

function renderChart(code) {
  const result = document.getElementById("result");

  result.innerHTML = ""; // clear first

  try {
    result.innerHTML = `<div class="mermaid">${code}</div>`;
    mermaid.init(undefined, document.querySelectorAll(".mermaid"));
  } catch (err) {
    console.error(err);
    result.innerHTML = "Error rendering diagram";
  }
}

flowchartBtn.addEventListener("click", () => {
  generateFlowchart();
});

let steps = [];
let currentStep = 0;
let currentDecoration = [];

function highlightLine(lineNumber) {
  currentDecoration = window.editor.deltaDecorations(currentDecoration, [
    {
      range: new monaco.Range(lineNumber, 1, lineNumber, 1),
      options: {
        isWholeLine: true,
        className: "highlightLine",
      },
    },
  ]);
}

dryRunBtn.addEventListener("click", async () => {
  nextStepBtn.classList.remove("hidden");
  if (!window.editor) {
    alert("Editor not ready yet");
    return;
  }
  console.log("Dry Run button clicked");
  const inputVal = window.editor.getValue().trim();

  const response = await fetch("https://decodify-1.onrender.com/api/v1/create/dryRun", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: inputVal,
    }),
  });

  const data = await response.json();

  steps = data.data;
  currentStep = 0;
  result.innerHTML = `
   <p id="typingText" class="text-[#94A3B8] leading-relaxed whitespace-pre-line">
    Step 1: ${steps[0]}
  </p>
`;

  highlightLine(2);

  // nextStepBtn.classList.remove("hidden");
});
function handleBtnClick() {
  currentStep++;
  if (currentStep < steps.length) {
    result.innerHTML += `
     <p id="typingText" class="text-[#94A3B8] leading-relaxed whitespace-pre-line">
      Step ${currentStep + 1}: ${steps[currentStep]}
    </p>
  `;

    if (steps[currentStep].includes("=")) {
      highlightLine(2); // loop line
    } else {
      highlightLine(3); // console.log line
    }
  }
}

nextStepBtn.addEventListener("click", handleBtnClick);
