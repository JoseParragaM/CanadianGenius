document.addEventListener("DOMContentLoaded", () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const category = localStorage.getItem('chosenCategory');

  if (!userData || !userData.answers[category]) {
    console.error("No user data found or invalid category.");
    return;
  }

  const score = userData.answers[category].score;
  const time = userData.answers[category].time;

  setPlayerName(userData.name);
  setScore(score);
  setTime(time);

  const percent = culcPercent(score, 5);

  setPercent(percent);
  addHighlight(percent);

  setQuiz();
});

const addHighlight = (percent) => {
  const feedbackItems = document.querySelectorAll('.feedback-item');

  feedbackItems.forEach(item => item.classList.remove('highlight'));

  let index;
  if (percent >= 100) index = 0;
  else if (percent >= 90) index = 1;
  else if (percent >= 80) index = 2;
  else if (percent >= 70) index = 3;
  else if (percent >= 50) index = 4;
  else if (percent >= 30) index = 5;
  else if (percent > 0) index = 6;
  else index = 7;

  feedbackItems[index]?.classList.add('highlight');
};

const goHome = () => window.location.href = '../../index.html';
const goToScoreboard = () => window.location.href = '../scoreboard/index.html';

const getJsonData = async (path) => {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
};

const setPlayerName = (name) => {
  const playerName = name || "Player";
  document.getElementById('player-name').textContent = playerName;
}

const setScore = (score) => {
  document.getElementById('score').textContent = score;
};

const setTime = (time) => {
  document.getElementById('time').textContent = time;
};

const culcPercent = (score, total) => Math.round((score / total) * 100);

const setPercent = (percent) => {
  document.getElementById('percent').textContent = percent;
};

const setQuiz = () => {
  const questions = JSON.parse(localStorage.getItem('chosenQuestions')) || [];
  const userData = JSON.parse(localStorage.getItem('userData')) || {};
  const category = localStorage.getItem('chosenCategory');

  if (!questions.length || !userData.answers?.[category]) {
    console.error("Missing quiz data.");
    return;
  }

  const container = document.getElementById("quiz-container");
  if (!container) {
    console.error("quiz-container not found!");
    return;
  }

  questions.forEach((question, i) => {
    const userAnswer = getUserAnswer(question.id);
    if (userAnswer.optionId) {
      const isCorrect = userAnswer && userAnswer.optionId === question.answer.id;

      const section = document.createElement("div");
      section.classList.add("question-section");

      section.innerHTML = `
      <h3 class="question-title">Question ${i + 1}</h3>
      <p class="question-text">${question.textQuestion}</p>
      <ul class="answer-list">
        ${question.options.map(option => {
        let result = "";
        if (userAnswer?.optionId === option.id) {
          result = option.id === question.answer.id ? " ✅ (Correct!)" : " ❌ (Incorrect!)";
        }

        let className = "";
        if (option.id === question.answer.id) {
          className = "correct-answer";
        }
        if (userAnswer?.optionId === option.id) {
          className = option.id === question.answer.id ? "correct" : "incorrect";
        }

        return `<li class="answer-item ${className}">
            ${option.text} ${result}
          </li>`;
      }).join("")}
      </ul>
      <p class="answer-feedback ${isCorrect ? '' : 'incorrect-feedback'}">
        ${question.explanation.text}
      </p>
    `;

      container.appendChild(section);
    }
  });
};

const getUserAnswer = (questionId) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const category = localStorage.getItem('chosenCategory');
  return userData.answers[category].userAnswers.find(a => a.questionId === questionId);
};
