document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("name-input");
    const nameError = document.getElementById("name-error");

    let userData = JSON.parse(localStorage.getItem("userData")) || {
        name: "",
        answers: {
            history: { score: 0, time: "", userAnswers: [] },
            sports: { score: 0, time: "", userAnswers: [] },
            places: { score: 0, time: "", userAnswers: [] },
            art: { score: 0, time: "", userAnswers: [] },
            food: { score: 0, time: "", userAnswers: [] },
            activities: { score: 0, time: "", userAnswers: [] },
        },
    };
    nameInput.value = userData.name || "";
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("chosenCategory", "");
    localStorage.setItem("chosenQuestions", "");

    function checkNameAndLoadQuiz(event) {
        event.preventDefault();

        if (!nameInput.value.trim()) {
            event.stopPropagation();
            nameError.style.display = "block";
            alert("First, put a name please.");
            return;
        }

        nameError.style.display = "none";

        userData.name = nameInput.value.trim();
        localStorage.setItem("userData", JSON.stringify(userData));

        const category = event.target.id;
        if (!category) return;

        fetch("https://raw.githubusercontent.com/JoseParragaM/CanadianGenius/refs/heads/main/data/data.json")
            .then((response) => response.json())
            .then((data) => {
                const questions = data[category];
                const randomQuestions = questions
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5);

                localStorage.setItem("chosenCategory", category);
                localStorage.setItem(
                    "chosenQuestions",
                    JSON.stringify(randomQuestions)
                );

                userData.answers[category].userAnswers = randomQuestions.map((q) => ({
                    questionId: q.id,
                    optionId: null,
                }));
                userData.answers[category].score = 0;
                userData.answers[category].time = "";

                localStorage.setItem("userData", JSON.stringify(userData));
                window.location.href = "../templates/quiz/index.html";
            })
            .catch((error) => console.error("Error al cargar las preguntas:", error));
    }

    document.querySelectorAll(".category-card button").forEach((button) => {
        button.addEventListener("click", checkNameAndLoadQuiz);
    });

    document.querySelector(".scoreboard-button").addEventListener("click", () => {
        window.location.href = "../templates/scoreboard/index.html";
    });
});
