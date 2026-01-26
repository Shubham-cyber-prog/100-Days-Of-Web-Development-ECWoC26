const calcBtn = document.getElementById("calculateBtn");
const scoreEl = document.getElementById("score");
const barFill = document.getElementById("bar-fill");
const impactText = document.getElementById("impact-text");

calcBtn.onclick = () => {
  const browsing = Number(browsing.value) * 5;
  const streaming = Number(streaming.value) * 15;
  const messaging = Number(messaging.value) * 0.2;
  const posts = Number(posts.value) * 10;
  const gaming = Number(gaming.value) * 8;

  let score = Math.round(browsing + streaming + messaging + posts + gaming);
  score = Math.min(score, 300);

  scoreEl.textContent = score;

  barFill.style.width = `${(score / 300) * 100}%`;

  if (score < 80) {
    barFill.style.background = "#22c55e";
    impactText.textContent = "Low Digital Footprint 🌱 (Healthy usage)";
  } else if (score < 180) {
    barFill.style.background = "#eab308";
    impactText.textContent = "Moderate Footprint 🌐 (Balanced usage)";
  } else {
    barFill.style.background = "#ef4444";
    impactText.textContent = "High Footprint 🔥 (Reduce usage & data exposure)";
  }
};
