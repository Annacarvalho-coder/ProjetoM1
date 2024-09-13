// Perguntas e Respostas
const questions = [
    {
        question: "Qual país venceu a Copa do Mundo de 2014?",
        answers: ["Alemanha", "Brasil", "Argentina", "França"],
        correct: "Alemanha"
    },
    {
        question: "Quem é conhecido como o Rei do Futebol?",
        answers: ["Pelé", "Maradona", "Messi", "Cristiano Ronaldo"],
        correct: "Pelé"
    },
    {
        question: "Qual jogador ganhou 5 bolas de ouro?",
        answers: ["Cristiano Ronaldo", "Messi", "Neymar", "Ronaldinho"],
        correct: "Cristiano Ronaldo"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = ''; // Limpa o conteúdo anterior

    const question = document.createElement('h2');
    question.textContent = questions[currentQuestionIndex].question;
    quizDiv.appendChild(question);

    // Criando botões de resposta
    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(button);
        quizDiv.appendChild(button);
    });

    // Desabilitar o botão "Próxima Pergunta" até que uma resposta seja selecionada
    document.getElementById('next').disabled = true;
}

function checkAnswer(button) {
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (button.textContent === correctAnswer) {
        button.classList.add('correct');
        document.getElementById('next').disabled = false;
        alert("Resposta correta!");
    } else {
        button.classList.add('wrong');
        alert("Você errou! Fim de jogo.");
        resetQuiz();
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        alert("Parabéns, você completou o quiz!");
        resetQuiz();
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    loadQuestion();
}

// Inicializando o quiz na primeira pergunta
loadQuestion();
