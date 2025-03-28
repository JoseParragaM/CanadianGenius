// Define the key for localStorage
const STORAGE_KEY = 'userData'; // I changed the name of the key to userData

let userData = {}; // Global variable to store user data
let lablesCategories = [];
let scores = []; 

// Load data saved in localStorage or assign default values
function loadUserData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    userData = JSON.parse(stored);
  }  
}

function getLabelsCategories (){
  lablesCategories = Object.keys(userData.answers);
}

function getScore(){
 for(let i = 0; i < lablesCategories.length; i++){
  scores.push(userData.answers[lablesCategories[i]].score); 
 }
}

// Personalized messages for each category
const feedbackMessages = {
  Arts: "You enjoy expressing yourself through art. Keep exploring your creativity!",
  History: "History is your strong suit. You are very knowledgeable in the subject!",
  Places: "You love exploring new places. Keep discovering the world!",
  Activities: "You know how to enjoy your free time. That's very important!",
  Sports: "You're an active person and like to stay in shape!",
  Food: "You enjoy good food. Keep exploring new flavors!",
};

const MAX_SCORE = 5;
const THRESHOLD = 0;

// We execute the user data loading
loadUserData();
getLabelsCategories();
getScore();
console.log(userData)
// Radar chart configuration
const ctx = document.getElementById("radarChart").getContext("2d");

const radarChart = new Chart(ctx, {
  type: "radar",
  data: {
    labels: lablesCategories,
    datasets: [
      {
        label: "Stats",
        data: scores,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderColor: "rgb(34, 140, 197)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(0, 0, 0)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(174, 120, 39)",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: MAX_SCORE,
        beginAtZero: true,
        pointLabels: {
          font: { size: 14, weight: "bold" },
          color: "#2c3e50",
        },
        grid: { color: "#bdc3c7" },
        ticks: {
          backdropColor: "rgba(174, 189, 189, 0.75)",
          color: "#34495e",
          stepSize: 1,
          showLabelBackdrop: true,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        footerFont: { size: 12 },
      },
    },
  },
});

// Display feedback based on user data
function showFeedback(data, messages) {
  const feedbackContainer = document.getElementById("feedbackContainer");
  feedbackContainer.innerHTML = "";

  const highScores = Object.entries(data).filter(
    ([, score]) => score > THRESHOLD
  );

  if (highScores.length > 0) {
    highScores.forEach(([category]) => {
      const feedback = createFeedback(messages[category]);
      feedbackContainer.appendChild(feedback);
    });
  } else {
    const noFeedback = createFeedback("Keep working on all areas!");
    feedbackContainer.appendChild(noFeedback);
  }
}

// Create a div for the feedback message
function createFeedback(message) {
  const div = document.createElement("div");
  div.className = "feedback";
  div.textContent = message;
  return div;
}

// Show feedback when the page loads
showFeedback(userData, feedbackMessages);
