mermaid.initialize({ startOnLoad: false });

const result = document.querySelector("#result");
const flowchartBtn = document.querySelector("#flowchart");
const timeComplexityBtn = document.querySelector("#timeComplexityBtn");
const spaceComplexityBtn = document.querySelector("#spaceComplexityBtn");
const searchBtn = document.getElementById("search")


require.config({
  paths: { vs: 'https://unpkg.com/monaco-editor@latest/min/vs' }
});

require(['vs/editor/editor.main'], function () {

  monaco.editor.defineTheme('explainifyTheme', {
    base: 'vs-dark',
    inherit: true,

    rules: [
      { token: '', foreground: '#ecf0f6' },       
      { token: 'keyword', foreground: '60A5FA' }, 
      { token: 'string', foreground: '34D399' },  
      { token: 'comment', foreground: '64748B' },
      { token: 'number', foreground: 'FBBF24' }   
    ],

    colors: {
      'editor.background': '#1E293B',
      'editor.foreground': '#94A3B8',
      'editorLineNumber.foreground': '#64748B',
      'editorCursor.foreground': '#F1F5F9',
      'editor.lineHighlightBackground': '#334155'
    }
  });

  const editorInstance = monaco.editor.create(
    document.getElementById('editor'),
    {
      value: '// Write your code here\n',
      language: 'javascript',
      theme: 'explainifyTheme', 
      fontSize: 17,
      minimap: { enabled: false },
      automaticLayout: true
    }
  );

  window.editor = editorInstance;
});

searchBtn.addEventListener("click", async () => {
   if (!window.editor) {
    alert("Editor not ready yet");
    return;
  }

  const inputVal = window.editor.getValue().trim();

  const response = await fetch("http://localhost:8000/api/v1/topic/explain", {
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
    <div class="bg-[#1E293B] p-6 rounded-xl box-border max-w-[80vw]">
      <p class="text-[#94A3B8] leading-relaxed whitespace-pre-line">${data.data.explanation}</p>
    </div>
  `;
});

timeComplexityBtn.addEventListener("click", async () => {
  const inputVal = window.editor.getValue().trim();

  const response = await fetch(
    "http://localhost:8000/api/v1/generate/timeComplexity",
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
    <div class="bg-[#1E293B] p-6 rounded-xl box-border">
      <h2 class="text-2xl font-bold mb-3">${data.data.input}</h2>
      <p class="text-[#94A3B8] leading-relaxed whitespace-pre-line">${data.data.complexity}</p>
    </div>
  `;
});

spaceComplexityBtn.addEventListener("click", async () => {
  const inputVal = window.editor.getValue().trim();

  const response = await fetch(
    "http://localhost:8000/api/v1/generate/spaceComplexity",
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
    <div class="bg-[#1E293B] p-6 rounded-xl box-border">
      <h2 class="text-2xl font-bold mb-3">${data.data.input}</h2>
      <p class="text-[#94A3B8] leading-relaxed whitespace-pre-line">${data.data.complexity}</p>
    </div>
  `;
});

async function generateFlowchart() {
  const input = window.editor.getValue().trim().toString();

  const res = await fetch("http://localhost:8000/api/v1/input/flowchart", {
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
