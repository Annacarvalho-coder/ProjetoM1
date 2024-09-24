import { startTimer, saveProgress } from './modulo-utilitarios.js';
import { questions } from './modulo-perguntas.js';
import { displayQuestion, displayResult } from './modulo-interface.js';
import { checkAnswer, nextQuestion, calculateScore, resetQuiz } from './modulo-logica.js';

let currentPhase = 0;
let currentQuestion = 0;
let score = 0;
let correctAnswersInPhase = 0;
let quizStarted = false;

function loadQuestion() {
  const questionObj = questions[currentPhase][currentQuestion];
  displayQuestion(questionObj);
}

const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');

submitButton.addEventListener('click', () => {
  if (submitButton.textContent === 'Iniciar Quiz') {
    startQuiz();
  } else {
    checkAnswer();
  }
});

function startQuiz() {
  quizStarted = true;
  startTimer();
  loadQuestion();
}

nextButton.addEventListener('click', nextQuestion);
