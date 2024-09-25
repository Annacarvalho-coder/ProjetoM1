import { startTimer, saveProgress, loadProgress } from './modulo-utilitarios.js';
import { questions } from './modulo-perguntas.js';
import { displayQuestion, displayResult } from './modulo-interface.js';
import { checkAnswer, nextQuestion, calculateScore, resetQuiz } from './modulo-logica.js';
import { currentPhase, currentQuestion, score, correctAnswersInPhase } from './modulo-estado.js';

let quizStarted = false;

function loadQuestion() {
  const questionObj = questions[currentPhase][currentQuestion];
  displayQuestion(questionObj);
  addAnswerButtonListeners(); // Adiciona os listeners após carregar a pergunta
  
}

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submit');
  const nextButton = document.getElementById('next');

  submitButton.addEventListener('click', () => {
    if (submitButton.textContent === 'Iniciar Quiz') {
      startQuiz();
    } else {
      checkAnswer();
    }
  });

  nextButton.addEventListener('click', nextQuestion);
});

function startQuiz() {
  quizStarted = true;
  startTimer();
  loadQuestion();
  document.getElementById('submit').textContent = 'Enviar Resposta';
}

function addAnswerButtonListeners() {
  const answerButtons = document.querySelectorAll('#answers button');
  answerButtons.forEach(button => {
    button.addEventListener('click', () => {
      answerButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
    });
  });
}
