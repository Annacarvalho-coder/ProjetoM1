import { currentPhase, currentQuestion, score, correctAnswersInPhase } from './modulo-estado.js';

let timeLeft = 60; // Tempo inicial em segundos
let timerInterval;

export function startTimer() {
  const timerElement = document.getElementById('timer');
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Tempo restante: ${timeLeft} segundos`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // Implementar ação ao final do tempo (ex: finalizar o quiz)
      console.log('Tempo esgotado!');
    }
  }, 1000);
}

export function saveProgress() {
  // Salvando o progresso no localStorage
  const progress = {
    currentPhase,
    currentQuestion,
    score,
    correctAnswersInPhase
  };
  localStorage.setItem('quizProgress', JSON.stringify(progress));
  console.log('Progresso salvo!');
}

export function loadProgress() {
  // Carregando o progresso do localStorage
  const savedProgress = localStorage.getItem('quizProgress');
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);
    currentPhase = progress.currentPhase;
    currentQuestion = progress.currentQuestion;
    score = progress.score;
    correctAnswersInPhase = progress.correctAnswersInPhase;
    console.log('Progresso carregado!');
  }
}
/*
export function displayResult(result) {
  const resultDiv = document.getElementById('result');
  if (resultDiv) {
    resultDiv.textContent = result;
  } else {
    console.error("Elemento 'result' não encontrado.");
  }
}*/

  