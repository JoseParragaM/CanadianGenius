document.addEventListener("DOMContentLoaded", () => {

  const userData = JSON.parse(localStorage.getItem('userData'));

  const score = userData.answers.history.score;
  const time = userData.answers.history.time;
  setScore(score);
  setTime(time);
  const percent = culcPercent(score, 5);
  setPercent(percent);
  addHighlight(percent);

  setQuiz();
});


const addHighlight = (percent) => {
  const feedbackItems = document.querySelectorAll('.feedback-item');

  // Remove highlight from all items
  feedbackItems.forEach(item => item.classList.remove('highlight'));

  let index;

  if (percent >= 100) {
    index = 0;
  } else if (percent >= 90) {
    index = 1;
  } else if (percent >= 80) {
    index = 2;
  } else if (percent >= 70) {
    index = 3;
  } else if (percent >= 50) {
    index = 4;
  } else if (percent >= 30) {
    index = 5;
  } else if (percent > 0) {
    index = 6;
  } else {
    index = 7;
  }

  // Add highlight to the selected item
  feedbackItems[index].classList.add('highlight');
}

const goHome = () => {
  window.location.href = '../index.html';
}

const goToScoreboard = () => {
  window.location.href = 'scoreboard.html';
}

const getJosnData = async (path) => {
  const response = await fetch(path);
  const data = await response.json();
  console.log("Fetched data:", data);
  return data;
}

const setScore = (score) => {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = score;
}

const setTime = (time) => {
  const timeElement = document.getElementById('time');
  timeElement.textContent = time;
}

const culcPercent = (score, total) => {
  return Math.round(score / total * 100);
}

const setPercent = (percent) => {
  const percentElement = document.getElementById('percent');
  percentElement.textContent = percent;
}

const setQuiz = () => {
  const questions = JSON.parse(localStorage.getItem('chosenQuestions'));
  // TODO: Get user data from local storage
  // const userData = JSON.parse(localStorage.getItem('userData'));
  const container = document.getElementById("quiz-container");

  if (!container) {
    console.error("quiz-container not found!");
    return;
  }

  questions.forEach((question, i) => {
    const section = document.createElement("div");
    section.classList.add("question-section");

    section.innerHTML = `
        <h3 class="question-title">Question ${i + 1}</h3>
        <p class="question-text">${question.textQuestion}</p>
        <ul class="answer-list">
            ${question.options.map((option) => `
                <li class="answer-item ${option.id === question.answer.id ? 'correct' : ''}">
                    ${option.text} ${option.id === question.answer.id ? '✅ (Correct!)' : ''}
                </li>
            `).join("")}
        </ul>
        <p class="answer-feedback">${question.explanation.text}</p>
    `;

    container.appendChild(section);
  });
}


