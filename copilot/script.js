document.addEventListener("DOMContentLoaded", function () {
    let currentQuestion = 0;
    let scores = {};
    let tasks = [];

    function loadCSV(callback) {
        fetch('tasks.csv')
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n').slice(1);
                for (let line of lines) {
                    const parts = line.split(',');
                    if (parts.length >= 4) {
                        tasks.push({
                            group: parts[0].trim(),
                            task: parts[1].trim(),
                            difficulty: parts[2].trim(),
                            duration: parts[3].trim()
                        });
                    }
                }
                callback();
            });
    }

    function showQuestion() {
        if (currentQuestion >= 20 || currentQuestion >= tasks.length) {
            showResults();
            return;
        }

        const task = tasks[currentQuestion];
        document.getElementById("question-box").innerHTML = `
            <h3>Task ${currentQuestion + 1}:</h3>
            <p>${task.task}</p>
            <button onclick="recordAnswer('${task.group}')">I like this</button>
            <button onclick="recordAnswer(null)">Skip</button>
        `;
    }

    window.recordAnswer = function(group) {
        if (group) {
            scores[group] = (scores[group] || 0) + 1;
        }
        currentQuestion++;
        showQuestion();
    }

    function showResults() {
        let topGroup = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        let descriptions = {
            "leadership": "Organized, decisive, and good at delegating. They thrive in planning, coordination, and team management.",
            "photography": "Visual storytellers who enjoy capturing moments. They’re patient, creative, and technically skilled.",
            "design": "Detail-oriented and artistic. They enjoy layout, aesthetics, and making things visually appealing.",
            "sidebar": "Curious and trend-savvy. They like bite-sized content, infographics, and adding flair to stories.",
            "journalist": "Strong writers and communicators. They enjoy interviews, storytelling, and crafting compelling narratives.",
            "page finisher": "Perfectionists who love polishing work. They excel in proofreading, organizing, and finalizing content."
        };
        document.getElementById("result-box").innerHTML = `
            <h3>Your Recommended Role: ${topGroup}</h3>
            <p>${descriptions[topGroup.toLowerCase()] || "No description available."}</p>
        `;
    }

    loadCSV(showQuestion);
});
