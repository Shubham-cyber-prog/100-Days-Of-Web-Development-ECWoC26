let cards = JSON.parse(localStorage.getItem("flashcards")) || [];
let currentIndex = 0;
let flipped = false;

const cardEl = document.querySelector(".card");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

function renderCard() {
  if (cards.length === 0) {
    questionEl.textContent = "No flashcards yet!";
    answerEl.textContent = "Add one below 👇";
    return;
  }
  questionEl.textContent = cards[currentIndex].question;
  answerEl.textContent = cards[currentIndex].answer;
  cardEl.classList.remove("flipped");
}

function flipCard() {
  cardEl.classList.toggle("flipped");
}

function nextCard() {
  if (cards.length === 0) return;
  currentIndex = (currentIndex + 1) % cards.length;
  renderCard();
}

function prevCard() {
  if (cards.length === 0) return;
  currentIndex =
    (currentIndex - 1 + cards.length) % cards.length;
  renderCard();
}

function addCard() {
  const q = document.getElementById("qInput").value.trim();
  const a = document.getElementById("aInput").value.trim();

  if (!q || !a) {
    alert("Please enter both question and answer");
    return;
  }

  cards.push({ question: q, answer: a });
  localStorage.setItem("flashcards", JSON.stringify(cards));

  document.getElementById("qInput").value = "";
  document.getElementById("aInput").value = "";

  currentIndex = cards.length - 1;
  renderCard();
}

function deleteCard() {
  if (cards.length === 0) return;

  cards.splice(currentIndex, 1);
  localStorage.setItem("flashcards", JSON.stringify(cards));
  currentIndex = Math.max(0, currentIndex - 1);
  renderCard();
}

renderCard();
