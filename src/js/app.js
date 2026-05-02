// app.js

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-button');
    let currentQuestionIndex = 0;
    let score = 0;

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    function startGame() {
        startButton.classList.add('hide');
        score = 0;
        currentQuestionIndex = 0;
        questionContainer.classList.remove('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', selectAnswer);
            answerButtons.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtons.firstChild) {
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        if (correct) {
            score++;
        }
        Array.from(answerButtons.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        nextButton.classList.remove('hide');
    }

    function setStatusClass(element, correct) {
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }
});