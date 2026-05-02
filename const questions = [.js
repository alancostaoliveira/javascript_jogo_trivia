const questions = [
  {
    question: 'Qual linguagem roda no navegador para adicionar interatividade?',
    answers: ['Python', 'JavaScript', 'C#', 'Java'],
    correct: 'JavaScript',
  },
  {
    question: 'Qual tag HTML é usada para maior título?',
    answers: ['<title>', '<h1>', '<h6>', '<header>'],
    correct: '<h1>',
  },
  {
    question: 'Qual propriedade CSS muda a cor do texto?',
    answers: ['font-style', 'text-color', 'color', 'background-color'],
    correct: 'color',
  },
  {
    question: 'Qual método transforma JSON em objeto JavaScript?',
    answers: ['JSON.parse()', 'JSON.stringify()', 'toObject()', 'parse.JSON()'],
    correct: 'JSON.parse()',
  },
  {
    question: 'O que significa HTML?',
    answers: [
      'HyperText Markup Language',
      'High Text Machine Language',
      'Home Tool Markup Language',
      'Hyper Tool Multi Language',
    ],
    correct: 'HyperText Markup Language',
  },
];

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionCounter = document.getElementById('question-counter');
const scoreText = document.getElementById('score');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const resultText = document.getElementById('result-text');

let currentQuestionIndex = 0;
let score = 0;
let selected = false;

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', startGame);

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  selected = false;

  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  showQuestion();
}

function showQuestion() {
  selected = false;
  nextBtn.classList.add('hidden');
  answersContainer.innerHTML = '';

  const currentQuestion = questions[currentQuestionIndex];
  questionCounter.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
  scoreText.textContent = `Pontuação: ${score}`;
  questionText.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.classList.add('answer-btn');
    button.textContent = answer;

    button.addEventListener('click', () => selectAnswer(button, answer));
    answersContainer.appendChild(button);
  });
}

function selectAnswer(button, answer) {
  if (selected) return;
  selected = true;

  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === currentQuestion.correct) {
      btn.classList.add('correct');
    }
  });

  if (answer === currentQuestion.correct) {
    score++;
    scoreText.textContent = `Pontuação: ${score}`;
  } else {
    button.classList.add('wrong');
  }

  nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  gameScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  resultText.textContent = `Você fez ${score} de ${questions.length} pontos.`;
}
