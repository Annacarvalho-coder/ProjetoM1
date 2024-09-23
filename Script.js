const questions = [
    // Fase 1
    [
      {
        question: "",
        answers: [""],
        correctAnswer: ""
      },
      {
        question: "Qual foi a inspiração para a utilização do termo 'bug' para descrever erros em programas de computador?",
        answers: ["Um problema em um circuito lógico", "Uma referência à Segunda Guerra Mundial", "Um inseto encontrado em um dos primeiros computadores", "Uma homenagem a um pioneiro da computação"],
        correctAnswer: "Um inseto encontrado em um dos primeiros computadores"
      },
      {
        question: "Qual das seguintes tags HTML é usada para criar um link?",
        answers: ["<div>", "<img>", "<a>", "<p>"],
        correctAnswer: "<a>"
      },
      {
        question: "Qual foi o primeiro navegador web a suportar a linguagem JavaScript?",
        answers: ["Internet Explorer", "Netscape Navigator", "Google Chrome", "Mozilla Firefox"],
        correctAnswer: "Netscape Navigator"
      }
      
    ],
    // Fase 2
    [
      // Perguntas da Fase 2
      {
        question: "",
        answers: [""],
        correctAnswer: ""
      },
      {
        question: "",
        answers: [""],
        correctAnswer: ""
      },
      {
        question: "",
        answers: [""],
        correctAnswer: ""
      },
      {
        question: "",
        answers: [""],
        correctAnswer: ""
      }
    ],
    // Fase 3
    [
      // Perguntas da Fase 3
      {
        question: "",
        answers: [""],
        correctAnswer: ""
      },
      {
        question: "Diferença entre hoisting de var, let e const?",
        answers: ["var tem um comportamento mais permissivo, enquanto let e const introduzem regras mais rígidas para evitar erros comuns.", "O hoisting só ocorre com a palavra-chave var, sendo inexistente em let e const.", "O hoisting garante que todas as variáveis sejam inicializadas com o valor undefined.", "Nenhuma, apresenta a mesma função!"],
        correctAnswer: "var tem um comportamento mais permissivo, enquanto let e const introduzem regras mais rígidas para evitar erros comuns."
      },
      {
        question: "",
        answers: [""],
        correctAnswer: ""
      },
      {
        question: "",
        answers: [""],
        correctAnswer: ""
      }
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
