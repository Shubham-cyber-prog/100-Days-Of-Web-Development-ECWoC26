const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  toggleBtn.textContent = body.classList.contains("dark")
    ? "☀ Light Mode"
    : "🌙 Dark Mode";
});

// Optional: Animate numbers
function animateValue(id, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let obj = document.getElementById(id);

  let timer = setInterval(() => {
    current += increment;
    obj.textContent = current.toLocaleString();
    if (current === end) clearInterval(timer);
  }, stepTime);
}

animateValue("fbFollowers", 12000, 12450, 1000);
animateValue("twFollowers", 8000, 8230, 1000);
animateValue("igFollowers", 15500, 15980, 1000);
animateValue("ytSubscribers", 21000, 21300, 1000);
