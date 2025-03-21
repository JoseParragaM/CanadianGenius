document.addEventListener("DOMContentLoaded", async function () {

  addHighlight(0);

  const quizData = await getJosnData('/data/data.json')
  const userData = await getJosnData('/data/userData.json')

  applyScore('history', userData);
  applyTime('history', userData);
});


const addHighlight = (score) => {
  const feedbackItems = document.querySelectorAll('.feedback-item');

  // Remove highlight from all items
  feedbackItems.forEach(item => item.classList.remove('highlight'));

  let index;

  if (score >= 100) {
    index = 0;
  } else if (score >= 90) {
    index = 1;
  } else if (score >= 80) {
    index = 2;
  } else if (score >= 70) {
    index = 3;
  } else if (score >= 50) {
    index = 4;
  } else if (score >= 30) {
    index = 5;
  } else if (score > 0) {
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

const applyScore = (category, userData) => {
  const score = userData.answers[category].score
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = score;
}

const applyTime = (category, userData) => {
  const time = userData.answers[category].time
  const timeElement = document.getElementById('time');
  timeElement.textContent = time;
}

const applyQuiz = (quizId, correctId, answerId) => {
  if(correctId === answerId) {
    const correctElement = document.getElementById(answerId);
    correctElement.classList.add('correct');
    timeElement.textContent = timeElement.textContent + " ✅(Correct!)"
  } else {
    const correctElement = document.getElementById(answerId);
    correctElement.classList.add('incorrect');
    timeElement.textContent = timeElement.textContent + " ❌(Incorrect!)"
    const answerElement = document.getElementById(correctId);
    answerElement.classList.add('correct-answer');
  }
}