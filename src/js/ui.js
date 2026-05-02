// Este arquivo contém funções que manipulam a interface do usuário, como atualizar a exibição das perguntas, mostrar resultados e gerenciar eventos de clique.

const ui = (() => {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');

    const displayQuestion = (question) => {
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-button');
            button.addEventListener('click', () => handleOptionClick(option, question.correctAnswer));
            optionsElement.appendChild(button);
        });
    };

    const handleOptionClick = (selectedOption, correctAnswer) => {
        if (selectedOption === correctAnswer) {
            resultElement.textContent = 'Correto!';
        } else {
            resultElement.textContent = 'Incorreto! A resposta correta é: ' + correctAnswer;
        }
    };

    const clearResults = () => {
        resultElement.textContent = '';
    };

    return {
        displayQuestion,
        clearResults
    };
})(); 

export default ui;