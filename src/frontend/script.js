mermaid.initialize({ startOnLoad: false });

const result = document.querySelector("#result");
const searchBtn = document.querySelector("#search");
const input = document.querySelector("#input");
const flowchartBtn = document.querySelector("#flowchart");
const timeComplexityBtn = document.querySelector("#timeComplexityBtn");
const spaceComplexityBtn = document.querySelector("#spaceComplexityBtn");

searchBtn.addEventListener("click", async () => {
  const inputVal = input.value.trim();

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
    <div class="bg-[#1E293B] p-6 rounded-xl box-border">
      <h2 class="text-2xl font-bold mb-3">${data.data.input}</h2>
      <p class="text-[#94A3B8] leading-relaxed whitespace-pre-line">${data.data.explanation}</p>
    </div>
  `;
});

timeComplexityBtn.addEventListener("click", async () => {
  const inputVal = input.value.trim();

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
  const inputVal = input.value.trim();

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
  const input = document.getElementById("input").value.trim().toString();

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
