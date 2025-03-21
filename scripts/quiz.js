let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let questions = []; 
let qNumber = 1;

const timeEle = document.getElementById("time");

function timeRefresh() {
    let numbers = 
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
    timeEle.textContent = numbers;
}

function Initiate() {
    if (!interval) {
        interval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            timeRefresh();
        }, 1000);
    }
}

window.onload = function() {
    Initiate();

    let chosenQuestions = JSON.parse(localStorage.getItem('chosenQuestions')) || [];

    if (chosenQuestions.length > 0) {
        questions = chosenQuestions;
        updateQuestion();
        enableButtons(); 
    }
};

const nextButton = document.getElementById("Next");
const prevButton = document.getElementById("Previous");
const finishButton = document.getElementById("Finish");
const homeButton = document.getElementById("Home");
const questionTitle = document.getElementById("questionTitle");
const optionsList = document.getElementById("optionsList");

function updateQuestion() {
    if (questions.length > 0 && qNumber <= questions.length) {
        const question = questions[qNumber - 1];
        console.log(question)
        questionTitle.textContent = `Question ${qNumber}: ${question.textQuestion}`;

        optionsList.innerHTML = ""; 

        question.options.forEach(option => {
            const li = document.createElement("li");
            li.innerHTML = `<input type="radio" name="answer" value="${option.id}"> ${option.text}`;
            optionsList.appendChild(li);
        });
    }
}

function enableButtons() {
    nextButton.onclick = function() {
        if (qNumber < questions.length) { 
            qNumber++;
            updateQuestion();
        }
    };

    prevButton.onclick = function() {
        if (qNumber > 1) { 
            qNumber--;
            updateQuestion();
        }
    };

    finishButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to finish the quiz?')) {
            window.location.href = 'feedback.html';
        }
    });

    homeButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to go to the Home Page of the quiz?')) {
            window.location.href = '../index.html';
        }
    });
}