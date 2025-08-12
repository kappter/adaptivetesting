let tasks = [];
let currentQ = 0;
let totalQuestions = 20;
let scores = {
  leadership: 0,
  photography: 0,
  design: 0,
  sidebar: 0,
  journalist: 0,
  pagefinisher: 0
};

const roleMap = {
  "Planning": "leadership",
  "Photography": "photography",
  "Layout Design": "design",
  "Sidebars": "sidebar",
  "Writing Copy": "journalist",
  "Captions": "journalist",
  "Proofreading": "pagefinisher"
  // Other categories from your CSV can also map accordingly
};

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadTasks() {
  Papa.parse('tasks.csv', {
    header: true,
    download: true,
    complete: function(results) {
      tasks = results.data.filter(row => row.task && row.group);
      shuffle(tasks);
      showQuestion();
    }
  });
}

function showQuestion() {
  if (currentQ >= totalQuestions || currentQ >= tasks.length) {
    showResult();
    return;
  }
  const sampleTasks = shuffle([...tasks]).slice(0, 6); // 6 options per question
  
  let html = `<div><strong>Q${currentQ + 1}:</strong> Which of these would you most enjoy?</div><form>`;
  sampleTasks.forEach(t => {
    const mappedRole = roleMap[t.group] || "leadership"; // fallback
    html += `<label class="option">
      <input type="radio" name="group" value="${mappedRole}"> ${t.task}
    </label>`;
  });
  html += "</form>";
  
  document.getElementById("question-section").innerHTML = html;
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  const selected = document.querySelector('input[name="group"]:checked');
  if (!selected) {
    alert("Please select an option!");
    return;
  }
  scores[selected.value]++;
  currentQ++;
  showQuestion();
}

function showResult() {
  document.getElementById("question-section").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
  
  let maxGroup = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const descriptions = {
    leadership: "You’re a natural organizer and motivator. Your leadership skills will keep the team on track.",
    photography: "You capture the world through lenses with creativity and timing.",
    design: "You see visual possibilities everywhere and know how to make a layout shine.",
    sidebar: "You’re curious and love fun, quirky details that make readers smile.",
    journalist: "You turn real events into engaging stories readers want to explore.",
    pagefinisher: "You finish tasks with precision, ensuring the final product looks perfect."
  };
  
  document.getElementById("result-section").innerHTML = `
    <h2>Your Ideal Yearbook Role: ${maxGroup.charAt(0).toUpperCase() + maxGroup.slice(1)}</h2>
    <p>${descriptions[maxGroup]}</p>
  `;
  document.getElementById("result-section").style.display = "block";
}

document.getElementById("next-btn").onclick = nextQuestion;

window.onload = loadTasks;
