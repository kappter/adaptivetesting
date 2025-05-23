let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionHistory = [];
let testType = '';
let studentName = '';
const totalQuestions = 10;

// Enable/disable start button
document.getElementById('test-type').addEventListener('change', (e) => {
  testType = e.target.value;
  document.getElementById('start-btn').disabled = !testType;
});

// Start test
document.getElementById('start-btn').addEventListener('click', () => {
  studentName = document.getElementById('student-name').value.trim() || 'Anonymous';
  document.getElementById('start-container').classList.add('hidden');
  document.getElementById('test-container').classList.remove('hidden');
  loadTest();
});

// Load test
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

// Select next question
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

// Show results
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
  } else if (testType === 'yearbook' || testType === 'photography' || testType === 'robotics') {
    const topTopics = getTopTopics();
    recommendation = score >= totalQuestions * 40
      ? `You are well-suited for ${testType} roles such as ${topTopics.join(' or ')}!`
      : `You may benefit from practicing skills in ${topTopics.join(', ')} for ${testType} roles.`;
  }
  document.getElementById('recommendation').innerText = recommendation;
}

// Get top-performing topics
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

// Print report
document.getElementById('print-btn').addEventListener('click', () => {
  const testName = testType.charAt(0).toUpperCase() + testType.slice(1);
  let recommendation = document.getElementById('recommendation').innerText;
  const reportWindow = window.open('', '_blank');
  reportWindow.document.write(`
    <html>
      <head>
        <title>Test Report - ${studentName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { text-align: center; }
          .report { max-width: 600px; margin: 0 auto; }
          .report p { margin: 10px 0; }
          .print-btn { display: block; margin: 20px auto; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 5px; cursor: pointer; }
        </style>
      </head>
      <body>
        <h1>Test Report</h1>
        <div class="report">
          <p><strong>Student Name:</strong> ${studentName}</p>
          <p><strong>Test:</strong> ${testName} Skills Test</p>
          <p><strong>Score:</strong> ${score} / ${totalQuestions * 50}</p>
          <p><strong>Recommendation:</strong> ${recommendation}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <button class="print-btn" onclick="window.print()">Print</button>
      </body>
    </html>
  `);
  reportWindow.document.close();
});