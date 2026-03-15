const result = document.querySelector("#result");
const searchBtn = document.querySelector("#search");
const input = document.querySelector("#input");

searchBtn.addEventListener("click", async () => {
  const topic = input.value.trim();

  const response = await fetch("http://localhost:8000/api/v1/topic/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: topic,
    }),
  });

  const data = await response.json();
  
  result.innerHTML = `
    <div class="bg-[#1E293B] p-6 rounded-xl">
      <h2 class="text-2xl font-bold mb-3">${data.data.topic}</h2>
      <p class="text-[#94A3B8] leading-relaxed whitespace-pre-line">${data.data.explanation}</p>
    </div>
  `;
});
