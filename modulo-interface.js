export function displayQuestion(questionObj) {
    const questionElement = document.getElementById('question');
    questionElement.textContent = questionObj.question;
  
    const answersElement = document.getElementById('answers');
    answersElement.innerHTML = '';
  
    questionObj.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.classList.add('answer-button');
      button.dataset.answer = answer;
      answersElement.appendChild(button);
    });
  }
  
export function displayResult(result) {
    const resultElement = document.getElementById('result');
    resultElement.textContent = result ? 'Acertou!' : 'Errou!';
  }