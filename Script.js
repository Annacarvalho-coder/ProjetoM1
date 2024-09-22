const questions = [
    // Fase 1
    [
      {
        question: "Qual é a capital da França?",
        answers: ["Londres", "Paris", "Roma", "Berlim"],
        correctAnswer: "Paris"
      },
      {
        question: "Qual é a origem da expressão bug?",
        answers: ["Mosquito", "Guerra", "Nome do criador", "Homenagem a uma cidade"],
        correctAnswer: "Mosquito"

        question: "Qual das seguintes tags HTML é usada para criar um link?",
        answers: ["<div>", "<img>", "<a>", "<p>"],
        correctAnswer: "<a>"
      },
      // ... outras perguntas da Fase 1
    ],
    // Fase 2
    [
      // Perguntas da Fase 2
    ],
    // Fase 3
    [
      // Perguntas da Fase 3
    ]
];
  

let currentPhase = 0;
let currentQuestion = 0;
let score = 0;
const totalQuestions = questions.flat().length;
const resultDiv = document.getElementById('result');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');

function loadQuestion() {
const questionObj = questions[currentPhase][currentQuestion];
document.getElementById('question').textContent = questionObj.question;
const answersDiv = document.getElementById('answers');
answersDiv.innerHTML = '';
questionObj.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('answer-button');
    button.dataset.answer = answer;
    button.addEventListener('click', () => selectAnswer(button));
    answersDiv.appendChild(button);
});
submitButton.textContent = 'Responder';
submitButton.style.display = 'block';
nextButton.style.display = 'none';
}

function selectAnswer(button) {
const selectedButton = document.querySelector('.selected');
if (selectedButton) {
    selectedButton.classList.remove('selected');
}
button.classList.add('selected');
}

function checkAnswer() {
const selectedButton = document.querySelector('.selected');
if (!selectedButton) {
    resultDiv.textContent = "Por favor, selecione uma resposta.";
    return;
}
const selectedAnswer = selectedButton.dataset.answer;
if (selectedAnswer === questions[currentPhase][currentQuestion].correctAnswer) {
    selectedButton.classList.add('correct');
    score++;
    resultDiv.textContent = "Acertou!";
} else {
    selectedButton.classList.add('incorrect');
    resultDiv.textContent = "Incorreto!";
}
submitButton.style.display = 'none';
nextButton.style.display = 'block';
}

function nextQuestion() {
resultDiv.textContent = '';
if (currentQuestion === questions[currentPhase].length - 1) {
    currentPhase++;
    if (currentPhase < questions.length) {
    currentQuestion = 0;
    } else {
    resultDiv.textContent = `Parabéns! Você acertou ${score} de ${totalQuestions} questões.`;
    nextButton.style.display = 'none';
    return;
    }
} else {
    currentQuestion++;
}
loadQuestion();
}

submitButton.addEventListener('click', () => {
if (submitButton.textContent === 'Iniciar Quiz') {
    currentPhase = 0;
    currentQuestion = 0;
    score = 0;
    loadQuestion();
} else {
    checkAnswer();
}
});

nextButton.addEventListener('click', nextQuestion);
