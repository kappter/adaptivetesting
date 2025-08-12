const tasks = [
  { task: "Brainstorming yearbook theme ideas", group: "Planning", weight: 2 },
  { task: "Taking candid shots at school assemblies", group: "Photography", weight: 3 },
  { task: "Cropping images to fit layout requirements", group: "Photo Editing", weight: 1 },
  { task: "Conducting in-person interviews at lunch", group: "Interviews", weight: 3 },
  { task: "Writing main article copy for sports section", group: "Writing Copy", weight: 3 },
  { task: "Crafting short descriptions for photos", group: "Captions", weight: 1 },
  { task: "Developing sidebar content on trends", group: "Sidebars", weight: 3 },
  { task: "Arranging elements on a page in software", group: "Layout Design", weight: 3 },
  { task: "Reading copy for spelling errors", group: "Proofreading", weight: 1 },
  { task: "Designing ad layouts for sponsors", group: "Sales and Advertising", weight: 3 },
  { task: "Live-tweeting or posting event updates", group: "Event Coverage", weight: 2 },
  { task: "Tracking assignment completions", group: "Organization and Planning", weight: 3 },
  { task: "Facilitating brainstorming sessions", group: "Meetings and Collaboration", weight: 2 },
  { task: "Preparing yearbooks for distribution", group: "Distribution", weight: 1 },
  // Add more tasks as needed
];

const roleDescriptions = {
  "Planning": "Organized and visionary. You thrive in strategy, coordination, and big-picture thinking.",
  "Photography": "Creative and observant. You love capturing moments and telling stories visually.",
  "Photo Editing": "Detail-oriented and tech-savvy. You enjoy refining visuals and enhancing images.",
  "Interviews": "Curious and personable. You enjoy connecting with people and uncovering stories.",
  "Writing Copy": "Articulate and expressive. You craft compelling narratives and bring events to life.",
  "Captions": "Witty and concise. You add flavor and clarity to visual content.",
  "Sidebars": "Trendy and analytical. You love bite-sized content and visual storytelling.",
  "Layout Design": "Artistic and precise. You create visually appealing and readable pages.",
  "Proofreading": "Meticulous and grammar-savvy. You ensure everything is polished and accurate.",
  "Sales and Advertising": "Persuasive and strategic. You connect with sponsors and promote the yearbook.",
  "Event Coverage": "Energetic and responsive. You thrive in fast-paced environments and live reporting.",
  "Organization and Planning": "Efficient and reliable. You keep everything running smoothly behind the scenes.",
  "Meetings and Collaboration": "Team-oriented and diplomatic. You foster communication and teamwork.",
  "Distribution": "Logistical and helpful. You ensure the final product reaches everyone."
};

let currentQuestion = 0;
let scores = {};

function submitAnswer(interestLevel) {
  const task = tasks[currentQuestion];
  const score = interestLevel * task.weight;
  scores[task.group] = (scores[task.group] || 0) + score;

  currentQuestion++;
  if (currentQuestion < 20 && currentQuestion < tasks.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showQuestion() {
  const task = tasks[currentQuestion];
  document.getElementById("question-box").innerHTML = `<h3>Task ${currentQuestion + 1}:</h3><p>${task.task}</p>`;
}

function showResult() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");

  const topGroup = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  document.getElementById("role-name").textContent = topGroup;
  document.getElementById("role-description").textContent = roleDescriptions[topGroup];
}

window.onload = showQuestion;
