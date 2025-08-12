let questions = [];
let currentQuestionIndex = 0;
let score = { Leadership: 0, Photography: 0, Design: 0, Sidebar: 0, Journalist: 0, "Page Finisher": 0 };

// Load CSV file
fetch('questions.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1); // Skip header
    questions = rows.map(row => {
      const [id, question, category, type, options, correct_option] = row.split(',');
      return {
        id: parseInt(id),
        question,
        category,
        type,
        options: options.split(','),
        correct_option: parseInt(correct_option) - 1, // Convert to 0-based index
      };
    });
    displayQuestion();
  });

// Display question
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  document.getElementById('question-text').textContent = question.question;
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => selectOption(index));
    optionsContainer.appendChild(optionElement);
  });
  document.getElementById('next-btn').style.display = 'none';
}

// Handle option selection
function selectOption(index) {
  const question = questions[currentQuestionIndex];
  if (index === question.correct_option) {
    score[question.category] += 1;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  const maxScore = Math.max(...Object.values(score));
  const recommendedRole = Object.keys(score).find(key => score[key] === maxScore);
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
  document.getElementById('result-text').textContent = recommendedRole;
  document.getElementById('role-description').textContent = getRoleDescription(recommendedRole);
}

// Role descriptions
function getRoleDescription(role) {
  const descriptions = {
    Leadership: "Leaders are decisive, visionary, and excel at guiding teams toward goals. They thrive in roles that require strategic thinking and team management.",
    Photography: "Photographers are creative, detail-oriented, and have a keen eye for capturing moments. They excel in roles that require visual storytelling.",
    Design: "Designers are innovative, artistic, and skilled at creating visually appealing layouts. They thrive in roles that require creativity and attention to aesthetics.",
    Sidebar: "Sidebar specialists are organized, concise, and adept at summarizing information. They excel in roles that require brevity and clarity.",
    Journalist: "Journalists are curious, articulate, and skilled at researching and writing stories. They thrive in roles that require investigative skills and clear communication.",
    "Page Finisher": "Page finishers are meticulous, detail-oriented, and ensure content is polished and error-free. They excel in roles that require precision and perfection.",
  };
  return descriptions[role];
}
