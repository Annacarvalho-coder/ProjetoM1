import { displayResult } from './modulo-interface';
export function checkAnswer(selectedAnswer) {
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
  
    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
    const selectedButtons = document.querySelectorAll('.selected');
    selectedButtons.forEach(button => button.classList.remove('selected'));
  }
  
  export function nextQuestion() {
    resultDiv.textContent = ''; // Limpar resultado antes de avançar
    if (currentQuestion === questions[currentPhase].length - 1) {
      currentPhase++;
      if (currentPhase < questions.length) {
        currentQuestion = 0;
        correctAnswersInPhase = 0; // Reiniciar acertos na fase
      } else {
        resultDiv.textContent = `Parabéns! Você acertou ${correctAnswersInPhase} de ${questions[currentPhase - 1].length} questões na última fase. Com ${score} pontos`;
        nextButton.style.display = 'none';
        return;
      }
    } else {
      currentQuestion++;
    }
    loadQuestion();
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
    resultDiv.textContent = "Você não acertou nenhuma pergunta. Tente novamente!";
  }