let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionHistory = [];
const totalQuestions = 10;

// Load CSV file
fetch('questions.csv')
  .then(response => response.text())
  .then(data => {
    questions = parseCSV(data);
    startTest();
  })
  .catch(error => {
    document.getElementById('loading').innerText = 'Error loading questions.';
    console.error(error);
  });

// Parse CSV
function parseCSV(data) {
  const lines = data.trim().split('\n').slice(1); // Skip header
  return lines.map(line => {
    const [id, question, opt1, opt2, opt3, opt4, correct, difficulty, topic] = line.split(',').map(item => item.trim());
    return {
      id: parseInt(id),
      question,
      options: [opt1, opt2, opt3, opt4].filter(opt => opt),
      correct: parseInt(correct),
      difficulty: parseInt(difficulty),
      topic
    };
  });
}

// Start test
function startTest() {
  document.getElementById('loading').classList.add('hidden');
  currentQuestionIndex = selectQuestion(3); // Start with medium difficulty
  displayQuestion();
}

// Select next question based on performance
function selectQuestion(currentDifficulty) {
  const unanswered = questions.filter(q => !questionHistory.includes(q.id));
  let candidates = unanswered.filter(q => q.difficulty === currentDifficulty);
  if (!candidates.length) {
    candidates = unanswered.filter(q => Math.abs(q.difficulty - currentDifficulty) <= 1);
  }
  if (!candidates.length) candidates = unanswered;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return questions.findIndex(q => q.id === candidates[randomIndex].id);
}

// Display question
function displayQuestion() {
  if (questionHistory.length >= totalQuestions) {
    showResults();
    return;
  }
  const q = questions[currentQuestionIndex];
  document.getElementById('question-text').innerText = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach((option, index) => {
    const div = document.createElement('div');
    div.className = 'option p-3 border rounded';
    div.innerText = option;
    div.onclick = () => selectOption(index + 1);
    optionsDiv.appendChild(div);
  });
  document.getElementById('feedback').classList.add('hidden');
  document.getElementById('next-btn').classList.add('hidden');
}

// Handle option selection
function selectOption(selected) {
  const q = questions[currentQuestionIndex];
  const feedback = document.getElementById('feedback');
  const options = document.querySelectorAll('.option');
  feedback.classList.remove('hidden');
  if (selected === q.correct) {
    feedback.innerText = 'Correct!';
    feedback.className = 'mb-4 text-green-600';
    score += q.difficulty * 10;
    currentQuestionIndex = selectQuestion(q.difficulty + 1);
  } else {
    feedback.innerText = `Incorrect. Correct answer: ${q.options[q.correct - 1]}`;
    feedback.className = 'mb-4 text-red-600';
    options[selected - 1].classList.add('incorrect');
    currentQuestionIndex = selectQuestion(q.difficulty - 1);
  }
  questionHistory.push(q.id);
  options.forEach(opt => opt.onclick = null); // Disable further clicks
  document.getElementById('next-btn').classList.remove('hidden');
}

// Show next question
document.getElementById('next-btn').onclick = () => {
  if (questionHistory.length < totalQuestions) {
    displayQuestion();
  } else {
    showResults();
  }
};

// Show final results
function showResults() {
  document.getElementById('question-container').classList.add('hidden');
  document.getElementById('next-btn').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('score').innerText = `Your score: ${score} / ${totalQuestions * 50}`;
  const recommendation = score >= totalQuestions * 40
    ? 'You are well-prepared for the advanced programming class!'
    : 'You may benefit from reviewing control structures, objects, and collections before the advanced class.';
  document.getElementById('recommendation').innerText = recommendation;
}