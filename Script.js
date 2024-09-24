const questions = [
    // Fase 1
    [
      {
        question: "O que significa CSS?",
        answers: ["Custom Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
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
        question: "Qual linguagem de programação é conhecida como a 'linguagem da web'?",
        answers: ["Python", "Java", "JavaScript", "Ruby"],
        correctAnswer: "JavaScript"
      },
      {
        question: "Qual protocolo é utilizado para transferir páginas web?",
        answers: ["FTP", "SMTP", "HTTP", "TCP"],
        correctAnswer: "HTTP"
      },
      {
        question: "Em que ano foi lançado o primeiro site?",
        answers: ["1990", "1991", "1992", "1993"],
        correctAnswer: "1991"
      },
      {
        question: "Qual elemento HTML é utilizado para definir um título principal?",
        answers: ["<h1>", "<title>", "<header>", "<div>"],
        correctAnswer: "<h1>"
      }
    ],
    // Fase 3
    [
      // Perguntas da Fase 3

      {
        question: "Qual dos seguintes é um framework JavaScript popular para desenvolvimento de interfaces de usuário?",
        answers:["Laravel", "Django", "React", "Flask"],
        correctAnswer: "React"
      },
      {
        question: "Diferença entre hoisting de var, let e const?",
        answers: ["var tem um comportamento mais permissivo, enquanto let e const introduzem regras mais rígidas para evitar erros comuns.", "O hoisting só ocorre com a palavra-chave var, sendo inexistente em let e const.", "O hoisting garante que todas as variáveis sejam inicializadas com o valor undefined.", "Nenhuma, apresenta a mesma função!"],
        correctAnswer: "var tem um comportamento mais permissivo, enquanto let e const introduzem regras mais rígidas para evitar erros comuns."
      },
      {
        question: "Qual é a finalidade do atributo 'alt' em uma tag <img> no HTML?",
        answers: ["Exibir texto alternativo se a imagem não carregar", "Modificar a posição da imagem", "Aumentar a velocidade de carregamento", "Mudar o formato da imagem"],
        correctAnswer: "Exibir texto alternativo se a imagem não carregar"
      },
      {
        question: "Qual das seguintes tecnologias é usada para armazenar dados no lado do cliente em uma página web?",      
        answers: ["Cookies", "PHP", "SQL", "JSON"],
        correctAnswer: "Cookies"
      }
    ]
];
  
let quizStarted = false;
let currentPhase = 0;
let currentQuestion = 0;
let score = 0;
let correctAnswersInPhase = 0;

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
if (quizStarted) {
  resultDiv.textContent = '';
} else {
  resultDiv.textContent = 'Clique em "Iniciar Quiz" para começar.';
}
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
    correctAnswersInPhase++;
    resultDiv.textContent = "Acertou!";
  } else {
    selectedButton.classList.add('incorrect');
    resultDiv.textContent = "Incorreto!";
  }
  score = calculateScore(correctAnswersInPhase);

  submitButton.style.display = 'none';
  nextButton.style.display = 'block';
  const selectedButtons = document.querySelectorAll('.selected');
  selectedButtons.forEach(button => button.classList.remove('selected'));   

}
//Isso aqui simplesmente não funciona, nem o console.log que deveria mostra o problema não funciona!
function calculateScore(correctAnswers) {
  console.log("Calculando a pontuação...");
  console.log("correctAnswersInPhase:", correctAnswersInPhase);
  console.log("totalQuestions:", totalQuestions);
  const pointsPerCorrectAnswer = 10;
  const totalPoints = correctAnswers * pointsPerCorrectAnswer;
  return totalPoints;
  
}
//no final apresentava uma mensagem de erro e agora nem finaliza
function nextQuestion() {
resultDiv.textContent = '';
if (currentQuestion === questions[currentPhase].length - 1) {
    currentPhase++;
    if (currentPhase < questions.length) {
    currentQuestion = 0;
    } else {
      resultDiv.textContent = `Parabéns! Você acertou ${correctAnswersInPhase} de ${questions[currentPhase].length} questões. Com ${score} pontos`;
    nextButton.style.display = 'none';
    return;
    }
} else {
    currentQuestion++;
}

loadQuestion();
}
//só funciona se errar tudo, quero implementar para que se errar uma já tenha que reiniciar
function resetQuiz() {
  currentPhase = 0;
  currentQuestion = 0;
  score = 0;
  correctAnswersInPhase = 0;
  loadQuestion();
  resultDiv.textContent = "Você não acertou nenhuma pergunta. Tente novamente!";
}

function showFinalResult() {
  resultDiv.textContent = `Parabéns! Você acertou ${correctAnswersInPhase} de ${questions[currentPhase].length} questões. Com ${score} pontos`;
}
//não está funcionando a parte de finalizar a 1 fase e dar a mensagem e depois iniciar a próxima
if (quizStarted) {
  if (currentPhase === questions.length - 1 && currentQuestion === questions[currentPhase].length - 1) {
    // Fim do quiz
    showFinalResult();
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
  } else if (currentPhase === 0 && currentQuestion === questions[currentPhase].length - 1) {
    // Fim da primeira fase
    currentPhase++;
    currentQuestion = 0;
    correctAnswersInPhase = 0;
    loadQuestion();
    resultDiv.textContent = 'Parabéns! Você completou a primeira fase. Prossiga para a próxima.';
  } else {
    currentQuestion++;
    loadQuestion();
  }
} else {
  resultDiv.textContent = 'Clique em "Iniciar Quiz" para começar.';// esse é para quando erra e tem que reiniciar
}

submitButton.addEventListener('click', () => {
  if (submitButton.textContent === 'Iniciar Quiz') {
    quizStarted = true;
    currentPhase = 0;
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    submitButton.textContent = 'Responder';
  } else {
    checkAnswer();
  }
});

nextButton.addEventListener('click', nextQuestion);
