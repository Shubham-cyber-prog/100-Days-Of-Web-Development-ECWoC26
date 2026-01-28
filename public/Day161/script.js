const calcBtn = document.getElementById("calcBtn");
const scoreEl = document.getElementById("score");
const barFill = document.getElementById("barFill");
const impactText = document.getElementById("impactText");

function safeNum(inputEl, multiplier = 1) {
  const n = Number(inputEl.value);
  const v = isNaN(n) || n < 0 ? 0 : n;
  return v * multiplier;
}

calcBtn.onclick = () => {
  const browsing = safeNum(document.getElementById("browsing"), 5);
  const streaming = safeNum(document.getElementById("streaming"), 6);
  const messaging = safeNum(document.getElementById("messaging"), 3);
  const gaming = safeNum(document.getElementById("gaming"), 7);
  const posts = safeNum(document.getElementById("posts"), 2);

  const total = browsing + streaming + messaging + gaming + posts;

  scoreEl.textContent = total;
  barFill.style.width = Math.min(total, 100) + "%";

  impactText.textContent =
    total < 30
      ? "Low Impact"
      : total < 60
      ? "Moderate Impact"
      : total < 90
      ? "High Impact"
      : "Extreme Impact";
};
