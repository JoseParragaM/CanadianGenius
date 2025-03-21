const userScores = {
  Arts: 1,
  History: 2,
  Places: 2,
  "Leisure time": 2,
  Sports: 2,
  Food: 9,
};

// Custom messages for each category
const feedbackMessages = {
  Arts: "You enjoy expressing yourself through art. Keep exploring your creativity!",
  History:
    "History is your strong suit. You are very knowledgeable in the subject!",
  Places: "You love exploring new places. Keep discovering the world!",
  "Leisure time":
    "You know how to enjoy your free time. That's very important!",
  Sports: "You're an active person and like to stay in shape!",
  Food: "You enjoy good food. Keep exploring new flavors!",
};

const MAX_SCORE = 10;
const THRESHOLD = 6;

const ctx = document.getElementById("radarChart").getContext("2d");

const radarChart = new Chart(ctx, {
  type: "radar",
  data: {
    labels: Object.keys(userScores),
    datasets: [
      {
        label: "Stats",
        data: Object.values(userScores),
        backgroundColor: "rgba(215, 215, 221, 0.5)",
        borderColor: "rgb(174, 39, 95)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(59, 39, 174)",
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

// Display feedback based on scores
function showFeedback(scores, messages) {
  const feedbackContainer = document.getElementById("feedbackContainer");
  feedbackContainer.innerHTML = "";

  const highScores = Object.entries(scores).filter(
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

// Create feedback div
function createFeedback(message) {
  const div = document.createElement("div");
  div.className = "feedback";
  div.textContent = message;
  return div;
}

// Show feedback when page loads
showFeedback(userScores, feedbackMessages);
