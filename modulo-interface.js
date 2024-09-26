export function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = result ? 'Acertou!' : 'Errou!';
}
  //essa é a que deveria chamar a função de checar a resposta, retornar
export function displayQuestion(questionObj) {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
  
    questionElement.textContent = questionObj.question;
    answersElement.innerHTML = ''; // Limpa as respostas anteriores
  
    questionObj.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer;
      answersElement.appendChild(button);
    });
}
  