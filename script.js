let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionHistory = [];
let testType = 'programming';
const totalQuestions = 10;

// Load test based on selection
function loadTest() {
  const loadingDiv = document.getElementById('loading');
  loadingDiv.classList.remove('hidden');
  document.getElementById('question-container').classList.add('hidden');
  document.getElementById('result').classList.add('hidden');
  document.getElementById('next-btn').classList.add('hidden');
  document.getElementById('feedback').classList.add('hidden');
  fetch(`questions_${testType}.csv`)
    .then(response => response.text())
    .then(data => {
      questions = parseCSV(data);
      startTest();
    })
    .catch(error => {
      loadingDiv.innerText = 'Error loading questions.';
      console.error(error);
    });
}

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
  currentQuestionIndex = 0;
  score = 0;
  questionHistory = [];
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('question-container').classList.remove('hidden');
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
  let recommendation = '';
  if (testType === 'programming') {
    recommendation = score >= totalQuestions * 40
      ? 'You are well-prepared for the advanced programming class!'
      : 'You may benefit from reviewing control structures, objects, and collections before the advanced class.';
  } else {
    const topTopics = getTopTopics();
    recommendation = score >= totalQuestions * 40
      ? `You are well-suited for yearbook roles such as ${topTopics.join(' or ')}!`
      : `You may benefit from practicing skills in ${topTopics.join(', ')} for yearbook roles.`;
  }
  document.getElementById('recommendation').innerText = recommendation;
}

// Get top-performing topics for yearbook
function getTopTopics() {
  const topicScores = {};
  questions.forEach(q => {
    if (questionHistory.includes(q.id)) {
      const userAnswer = questionHistory.indexOf(q.id) + 1;
      topicScores[q.topic] = (topicScores[q.topic] || 0) + (q.correct === userAnswer ? q.difficulty * 10 : 0);
    }
  });
  return Object.keys(topicScores).sort((a, b) => topicScores[b] - topicScores[a]).slice(0, 2);
}

// Handle test type change
document.getElementById('test-type').addEventListener('change', (e) => {
  testType = e.target.value;
  loadTest();
});

// Initial load
loadTest();