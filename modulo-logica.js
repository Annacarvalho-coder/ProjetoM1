
import { currentPhase, currentQuestion, score, correctAnswersInPhase } from './modulo-estado.js';
import { displayResult } from './modulo-interface.js';
import { questions } from './modulo-perguntas.js';

export function checkAnswer() {
    const selectedButton = document.querySelector('.selected');
    if (!selectedButton) {
      displayResult('Por favor, selecione uma resposta.');
      return;
    }
  
    const correctAnswer = questions[currentPhase][currentQuestion].correctAnswer;
  
    if (selectedAnswer === correctAnswer) {
      selectedButton.classList.add('correct');
      correctAnswersInPhase++;
      score += 10; // Ajustar a pontuação conforme necessário
    } else {
      selectedButton.classList.add('incorrect');
  }

  displayResult(selectedAnswer === correctAnswer);
  
  document.getElementById('submit').style.display = 'none';
  document.getElementById('next').style.display = 'block';
  selectedButton.classList.remove('selected');
}


export function nextQuestion() {
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = ''; // Limpar resultado antes de avançar
  if (currentQuestion === questions[currentPhase].length - 1) {
    currentPhase++;
    if (currentPhase < questions.length) {
      currentQuestion = 0;
      correctAnswersInPhase = 0; // Reiniciar acertos na fase
    } else {
      resultDiv.textContent = `Parabéns! Você acertou ${correctAnswersInPhase} de ${questions[currentPhase - 1].length} questões na última fase. Com ${score} pontos`;
      document.getElementById('next').style.display = 'none';
      return;
    }
  } else {
    currentQuestion++;
  }
  loadQuestion();
  document.getElementById('submit').style.display = 'block';
  document.getElementById('next').style.display = 'none';
}

export function calculateScore(correctAnswers) {
  const pointsPerCorrectAnswer = 10;
  const totalPoints = correctAnswers * pointsPerCorrectAnswer;
  return totalPoints;
}

export function resetQuiz() {
  currentPhase = 0;
  currentQuestion = 0;
  score = 0;
  correctAnswersInPhase = 0;
  loadQuestion();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = "Você não acertou nenhuma pergunta. Tente novamente!";
}
