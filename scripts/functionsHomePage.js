document.addEventListener('DOMContentLoaded', () => {
    let userData = JSON.parse(localStorage.getItem('userData')) || {
        name: '',
        answers: {
            history: { score: 0, time: '', userAnswers: [] },
            sports: { score: 0, time: '', userAnswers: [] },
            places: { score: 0, time: '', userAnswers: [] },
            art: { score: 0, time: '', userAnswers: [] },
            food: { score: 0, time: '', userAnswers: [] },
            activities: { score: 0, time: '', userAnswers: [] },
        }
    };

    for (let category in userData.answers) {
        userData.answers[category].userAnswers = [];
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('chosenCategory', '');
    localStorage.setItem('chosenQuestions', '');
});

document.querySelector('.buttons-category').addEventListener('click', (event) => {
    const category = event.target.id;
    if (!category) return;

    fetch('../data/data.json')
        .then(response => response.json())
        .then(data => {
            const questions = data[category];
            const randomQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);

            localStorage.setItem('chosenCategory', category);
            localStorage.setItem('chosenQuestions', JSON.stringify(randomQuestions));
            let userData = JSON.parse(localStorage.getItem('userData'));

            userData.answers[category].userAnswers = randomQuestions.map(q => ({
                questionId: q.id,
                optionId: null
            }));
            userData.answers[category].score = 0;
            userData.answers[category].time = '';

            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = '../templates/quiz.html';
        })
        .catch(error => console.error('Error:', error));
});

document.querySelector('.scoreboard-button').addEventListener('click', () => {
    window.location.href = '../templates/scoreboard.html';
});
