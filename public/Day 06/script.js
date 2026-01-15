// ===== CONFIGURATION CONSTANTS =====
const TIMER_CONFIG = {
    easy: 20,
    medium: 15,
    hard: 10
};
const WARNING_TIME = 5;
const ANSWER_DELAY = 1500;
const PARTICLE_COUNT = 10;
const CONFETTI_COUNT = 100;
const CONFETTI_DURATION = 5000;

// ===== DOM ELEMENTS WITH ERROR HANDLING =====
const getDOMElement = (id) => {
    const element = document.getElementById(id);
    if (!element) console.warn(`DOM element with id "${id}" not found`);
    return element;
};

const getQueryElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) console.warn(`DOM element with selector "${selector}" not found`);
    return element;
};

const startScreen = getDOMElement("start-screen");
const quizScreen = getDOMElement("quiz-screen");
const resultScreen = getDOMElement("result-screen");
const startButton = getDOMElement("start-btn");
const questionText = getDOMElement("question-text");
const answersContainer = getDOMElement("answer-container");
const currentQuestionSpan = getDOMElement("current-question");
const totalQuestionsSpan = getDOMElement("total-question");
const scoreSpan = getDOMElement("score");
const finalScoreSpan = getDOMElement("final-score");
const maxScoreSpan = getDOMElement("max-score");
const resultMessage = getDOMElement("result-message");
const restartButton = getDOMElement("restart-btn");
const progressBar = getDOMElement("progress");
const timerElement = getDOMElement("timer");
const timerContainer = getQueryElement(".timer-container");
const scoreCircle = getQueryElement(".score-circle");
const scoreText = getQueryElement(".score-text");
const correctAnswersElement = getDOMElement("correct-answers");
const incorrectAnswersElement = getDOMElement("incorrect-answers");
const accuracyElement = getDOMElement("accuracy");

const categoryButtons = document.querySelectorAll(".category-btn");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

// ===== VALIDATION CHECK (FIXED) =====
const validateDOM = () => {
    const requiredElements = [
        startScreen, quizScreen, resultScreen, startButton, questionText,
        answersContainer, scoreSpan, finalScoreSpan, maxScoreSpan,
        resultMessage, restartButton, progressBar, timerElement,
        timerContainer, scoreCircle, scoreText
    ];

    const allValid = requiredElements.every(el => el !== null);

    if (!allValid) {
        console.warn(
            "Quiz initialization aborted: required DOM elements are missing."
        );
        return false; // Graceful early exit
    }

    return true;
};

// ===== QUIZ DATA =====
// (UNCHANGED — your full quizData object stays exactly the same)
const quizData = { /* ... unchanged quiz data ... */ };

// ===== QUIZ STATE =====
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
let selectedCategory = "general";
let selectedDifficulty = "medium";
let timer;
let timeLeft = 15;
let correctAnswers = 0;
let incorrectAnswers = 0;
let quizQuestions = [];

// ===== INITIALIZATION =====
const initializeEventListeners = () => {
    if (startButton) startButton.addEventListener("click", startQuiz);
    if (restartButton) restartButton.addEventListener("click", restartQuiz);

    categoryButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            categoryButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            selectedCategory = this.dataset.category;
        });
    });

    difficultyButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            difficultyButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            selectedDifficulty = this.dataset.difficulty;
        });
    });
};

// ===== START APPLICATION =====
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        if (validateDOM()) initializeEventListeners();
    });
} else {
    if (validateDOM()) initializeEventListeners();
}
