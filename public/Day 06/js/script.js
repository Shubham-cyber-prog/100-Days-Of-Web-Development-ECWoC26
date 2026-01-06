/* ================================
   QUIZ APP - SCRIPT.JS
================================ */

// ===== DOM ELEMENTS =====
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const finalScore = document.getElementById("final-score");


// ===== QUIZ STATE =====
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// ===== START QUIZ =====
startBtn.addEventListener("click", () => {
  startScreen.classList.remove("active");
  startScreen.classList.add("hidden");

  quizScreen.classList.remove("hidden");
  quizScreen.classList.add("active");

  loadQuestion();
});

// ===== LOAD QUESTION =====
function loadQuestion() {
  // Reset state
  optionsContainer.innerHTML = "";
  selectedAnswer = null;
  nextBtn.disabled = true;

  const currentQuestion = questions[currentQuestionIndex];

  // Update UI
  questionText.textContent = currentQuestion.question;
  questionCount.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  // Create options
  currentQuestion.options.forEach((option, index) => {
    const optionBtn = document.createElement("button");
    optionBtn.classList.add("option-btn");
    optionBtn.textContent = option;

    optionBtn.addEventListener("click", () =>
      selectAnswer(index)
    );

    optionsContainer.appendChild(optionBtn);
  });
}

// ===== SELECT ANSWER =====
function selectAnswer(selectedIndex) {
  if (selectedAnswer !== null) return;

  selectedAnswer = selectedIndex;
  const correctIndex = questions[currentQuestionIndex].answer;

  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((btn, index) => {
    btn.disabled = true;

    if (index === correctIndex) {
      btn.classList.add("correct");
    } else if (index === selectedIndex) {
      btn.classList.add("wrong");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  nextBtn.disabled = false;
}

// ===== NEXT QUESTION =====
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

// ===== SHOW RESULT =====
function showResult() {
  quizScreen.classList.remove("active");
  quizScreen.classList.add("hidden");

  resultScreen.classList.remove("hidden");
  resultScreen.classList.add("active");

  finalScore.textContent = `Your Score: ${score} / ${questions.length}`;
}

// ===== RESTART QUIZ =====
restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;
  selectedAnswer = null;

  resultScreen.classList.remove("active");
  resultScreen.classList.add("hidden");

  startScreen.classList.remove("hidden");
  startScreen.classList.add("active");
});
