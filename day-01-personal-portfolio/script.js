console.log("Portfolio Loaded");

// Typing effect
const roles = ["Web Developer", "CSE Undergraduate", "Frontend Learner"];
let roleIndex = 0;
let charIndex = 0;
const typingElement = document.querySelector(".typing-text");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 1500);
  }
}

function openProject(type) {
  if (type === "portfolio") {
    alert("Personal Portfolio project clicked");
  } else if (type === "landing") {
    alert("Landing Page project clicked");
  }
}


function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 60);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 300);
  }
}

typeEffect();

// Smooth scroll
function scrollToSection() {
  document.querySelector(".projects").scrollIntoView({
    behavior: "smooth"
  });
}

// Snowflakes
const snowContainer = document.querySelector(".snow-container");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.innerHTML = "❄";

  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.animationDuration = 8 + Math.random() * 6 + "s";
  snowflake.style.fontSize = Math.random() * 10 + 12 + "px";

  snowContainer.appendChild(snowflake);

  setTimeout(() => snowflake.remove(), 12000);
}

setInterval(createSnowflake, 500);
