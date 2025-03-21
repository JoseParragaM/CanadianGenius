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

window.onload = Initiate;

document.addEventListener("DOMContentLoaded", function() {
    fetch('/data/data.json') 
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data:", data); 
            if (data && data.history && Array.isArray(data.history)) {
                questions = data.history; 
                console.log("Questions loaded:", questions);
                if (questions.length > 0) {
                    updateQuestion(); 
                    enableButtons(); 
                } 
            }
        })

    const nextButton = document.getElementById("Next");
    const prevButton = document.getElementById("Previous");
    const finishButton = document.getElementById("Finish");
    const questionTitle = document.getElementById("questionTitle");
    const optionsList = document.getElementById("optionsList");

    function updateQuestion() {
        if (questions.length > 0 && qNumber <= questions.length) {
            const question = questions[qNumber - 1];

            questionTitle.textContent = `Question ${qNumber}: ${question.textQuestion}`;

            optionsList.innerHTML = "";

            question.options.forEach(option => {
                const li = document.createElement("li");
                li.innerHTML = `<input type="radio" name="answer" value="${option}"> ${option}`;
                optionsList.appendChild(li);
            });
        }
    }

    function enableButtons() {
        nextButton.onclick = function() {
            if (qNumber < questions.length) { 
                qNumber++;
                updateQuestion();
                console.log(`Moved to Question ${qNumber}`);
            }
        };

        prevButton.onclick = function() {
            if (qNumber > 1) { 
                qNumber--;
                updateQuestion();
                console.log(`Moved to Question ${qNumber}`);
            }
        };

        finishButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to finish the quiz?')) {
                window.location.href = 'feedback.html';
            }
        });
    }
});
