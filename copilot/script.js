
let currentQuestion = 0;
let scores = {};
let questions = [];
let roles = {};

fetch('assessment_data.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        roles = data.roles;
        questions.forEach(q => {
            if (!scores[q.group]) scores[q.group] = 0;
        });
        showQuestion();
    });

function showQuestion() {
    const container = document.getElementById('question-container');
    container.innerHTML = '';
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }
    const q = questions[currentQuestion];
    const questionEl = document.createElement('div');
    questionEl.innerHTML = `
        <p><strong>Task:</strong> ${q.task}</p>
        <p><strong>Group:</strong> ${q.group}</p>
        <p><strong>Difficulty:</strong> ${q.difficulty}</p>
        <p><strong>Estimated Time:</strong> ${q.estimated_minutes} minutes</p>
        <label>How interested are you in this task?</label><br>
        <select id="interest">
            <option value="0">Not at all</option>
            <option value="1">Somewhat</option>
            <option value="2">Very interested</option>
        </select>
    `;
    container.appendChild(questionEl);
}

document.getElementById('next-button').addEventListener('click', () => {
    const interest = parseInt(document.getElementById('interest').value);
    const group = questions[currentQuestion].group;
    scores[group] += interest;
    currentQuestion++;
    showQuestion();
});

function showResult() {
    const container = document.getElementById('result-container');
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
    container.style.display = 'block';

    let bestRole = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    container.innerHTML = `
        <h2>Your Recommended Role: ${bestRole.charAt(0).toUpperCase() + bestRole.slice(1)}</h2>
        <p>${roles[bestRole]}</p>
    `;
}
