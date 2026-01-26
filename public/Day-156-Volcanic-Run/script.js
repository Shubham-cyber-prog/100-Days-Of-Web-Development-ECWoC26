const game = document.getElementById("game");
const player = document.getElementById("player");

let x = 180;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") x -= 20;
  if (e.key === "ArrowRight") x += 20;

  x = Math.max(0, Math.min(360, x));
  player.style.left = x + "px";
});

function spawnDebris() {
  const d = document.createElement("div");
  d.className = "debris";
  d.style.left = Math.random()*370 + "px";
  game.appendChild(d);

  let y = 0;

  const fall = setInterval(() => {
    y += 4;
    d.style.top = y + "px";

    if (y > 460) {
      d.remove();
      clearInterval(fall);
    }

    const p = player.getBoundingClientRect();
    const o = d.getBoundingClientRect();

    if (
      p.left < o.right &&
      p.right > o.left &&
      p.top < o.bottom &&
      p.bottom > o.top
    ) {
      alert("?? Game Over");
      location.reload();
    }

  }, 20);
}

setInterval(spawnDebris, 800);
