let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionHistory = [];
let testType = '';
let studentName = '';
let testTitle = 'Adaptive Skills Test';
const totalQuestions = 10;

// Enable/disable start button and update title
document.getElementById('test-type').addEventListener('change', (e) => {
  testType = e.target.value;
  const startBtn = document.getElementById('start-btn');
  if (testType) {
    startBtn.disabled = false;
    startBtn.classList.remove('btn-disabled');
    startBtn.classList.add('btn-primary');
  } else {
    startBtn.disabled = true;
    startBtn.classList.remove('btn-primary');
    startBtn.classList.add('btn-disabled');
  }
  // Update title based on selected test
  const testSelect = e.target;
  testTitle = testSelect.options[testSelect.selectedIndex].text || 'Adaptive Skills Test';
  document.getElementById('test-title').innerText = testTitle;
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
  const parsedQuestions = lines.map(line => {
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
  // Verify unique IDs
  const ids = parsedQuestions.map(q => q.id);
  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    console.warn('Duplicate question IDs detected in CSV');
  }
  return parsedQuestions;
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
  const currentQuestionId = questions[currentQuestionIndex]?.id;
  // Filter out questions already asked and the current question
  const unanswered = questions.filter(q => !questionHistory.includes(q.id) && q.id !== currentQuestionId);
  console.log(`Selecting question. Unanswered: ${unanswered.length}, History: ${questionHistory}, Current ID: ${currentQuestionId}`);
  
  if (unanswered.length === 0) {
    console.warn('No unanswered questions remain. Ending test early.');
    showResults();
    return -1;
  }
  
  // Select questions matching current difficulty
  let candidates = unanswered.filter(q => q.difficulty === currentDifficulty);
  if (!candidates.length) {
    // Fallback to questions within ±1 difficulty
    candidates = unanswered.filter(q => Math.abs(q.difficulty - currentDifficulty) <= 1);
  }
  if (!candidates.length) {
    // Final fallback: any unanswered question
    candidates = unanswered;
  }
  
  // Randomly select a candidate
  const randomIndex = Math.floor(Math.random() * candidates.length);
  const selectedQuestion = candidates[randomIndex];
  const selectedIndex = questions.findIndex(q => q.id === selectedQuestion.id);
  
  // Safeguard: Ensure selected question is not in history
  if (questionHistory.includes(selectedQuestion.id) || selectedQuestion.id === currentQuestionId) {
    console.error(`Attempted to select duplicate question: ID ${selectedQuestion.id}`);
    showResults();
    return -1;
  }
  
  console.log(`Selected question ID: ${selectedQuestion.id}`);
  return selectedIndex;
}

// Display question
function displayQuestion() {
  if (questionHistory.length >= totalQuestions || currentQuestionIndex === -1) {
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
  // Mark selected option
  options.forEach(opt => opt.classList.remove('selected'));
  options[selected - 1].classList.add('selected');
  feedback.classList.remove('hidden');
  // Add current question to history before selecting next
  questionHistory.push(q.id);
  console.log(`Answered question ID: ${q.id}, History: ${questionHistory}`);
  if (selected === q.correct) {
    feedback.innerText = 'Correct!';
    feedback.className = 'mb-4 text-light correct';
    score += q.difficulty * 10;
    currentQuestionIndex = selectQuestion(q.difficulty + 1);
  } else {
    feedback.innerText = `Incorrect. Correct answer: ${q.options[q.correct - 1]}`;
    feedback.className = 'mb-4 text-light incorrect';
    options[selected - 1].classList.add('incorrect');
    currentQuestionIndex = selectQuestion(q.difficulty - 1);
  }
  options.forEach(opt => opt.onclick = null); // Disable further clicks
  document.getElementById('next-btn').classList.remove('hidden');
}

// Show next question
document.getElementById('next-btn').onclick = () => {
  // Clear selected class
  const options = document.querySelectorAll('.option');
  options.forEach(opt => opt.classList.remove('selected'));
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
  if (testType === 'ib_computer_science') {
    recommendation = score >= totalQuestions * 40
      ? 'You are well-prepared for IB Computer Science (SL/HL)!'
      : 'You may benefit from reviewing computational thinking, algorithms, and object-oriented programming for IB Computer Science.';
  } else if (testType === 'ap_computer_science') {
    recommendation = score >= totalQuestions * 40
      ? 'You are well-prepared for the AP Computer Science A exam!'
      : 'You may benefit from reviewing variables, control structures, and object-oriented programming for AP Computer Science A.';
  } else if (testType === 'yearbook') {
    const topRole = getTopRole();
    recommendation = score >= totalQuestions * 40
      ? `You are well-suited for the ${topRole} role on the yearbook team!`
      : `You may benefit from practicing skills in ${topRole} to excel on the yearbook team.`;
  } else if (testType === 'robotics') {
    const topRole = getTopRole();
    recommendation = score >= totalQuestions * 40
      ? `You are well-suited for the ${topRole} role on the robotics team!`
      : `You may benefit from practicing skills in ${topRole} to excel on the robotics team.`;
  } else if (testType === 'photography') {
    const topTopics = getTopTopics();
    recommendation = score >= totalQuestions * 40
      ? `You are well-suited for photography roles such as ${topTopics.join(' or ')}!`
      : `You may benefit from practicing skills in ${topTopics.join(', ')} for photography roles.`;
  }
  document.getElementById('recommendation').innerText = recommendation;
}

// Get top-performing role for yearbook or robotics
function getTopRole() {
  const roleScores = {};
  const roleAttempts = {};
  const roleHighDifficulty = {};
  questionHistory.forEach((qId, index) => {
    const q = questions.find(q => q.id === qId);
    if (q) {
      roleScores[q.topic] = (roleScores[q.topic] || 0) + (index + 1 <= questionHistory.length && q.correct === (index + 1) ? q.difficulty * 10 : 0);
      roleAttempts[q.topic] = (roleAttempts[q.topic] || 0) + 1;
      if (q.correct === (index + 1) && q.difficulty >= 4) {
        roleHighDifficulty[q.topic] = (roleHighDifficulty[q.topic] || 0) + 1;
      }
    }
  });
  const roles = testType === 'yearbook'
    ? ['Design', 'Photography', 'Copywriting', 'Sidebar', 'Interviewing', 'Captioning', 'Leadership']
    : ['Coder', 'Driver', 'Builder', 'Documenter', 'Leader'];
  // Check for Leader eligibility (strong across multiple roles)
  if (testType === 'robotics') {
    const strongRoles = Object.keys(roleScores).filter(role => role !== 'Leader' && roleScores[role] >= 30);
    if (strongRoles.length >= 3 && (!roleScores['Leader'] || roleScores['Leader'] < 40)) {
      return 'Leader';
    }
  }
  let topRole = roles[0];
  let maxScore = -1;
  roles.forEach(role => {
    const score = roleScores[role] || 0;
    const attempts = roleAttempts[role] || 0;
    const highDifficulty = roleHighDifficulty[role] || 0;
    if (attempts > 0 && (score > maxScore || (score === maxScore && highDifficulty > (roleHighDifficulty[topRole] || 0)))) {
      maxScore = score;
      topRole = role;
    }
  });
  return topRole;
}

// Get top-performing topics (for photography test)
function getTopTopics() {
  const topicScores = {};
  questionHistory.forEach((qId, index) => {
    const q = questions.find(q => q.id === qId);
    if (q) {
      topicScores[q.topic] = (topicScores[q.topic] || 0) + (q.correct === (index + 1) ? q.difficulty * 10 : 0);
    }
  });
  return Object.keys(topicScores).sort((a, b) => topicScores[b] - topicScores[a]).slice(0, 2);
}

// Print report
document.getElementById('print-btn').addEventListener('click', () => {
  let recommendation = document.getElementById('recommendation').innerText;
  const reportWindow = window.open('', '_blank');
  reportWindow.document.write(`
    <html>
      <head>
        <title>${testTitle} Report - ${studentName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { text-align: center; }
          .report { max-width: 600px; margin: 0 auto; }
          .report p { margin: 10px 0; }
          .print-btn { display: block; margin: 20px auto; padding: 10px 20px; background: #1525D1; color: #E1E9E0; border: none; border-radius: 5px; cursor: pointer; }
        </style>
      </head>
      <body>
        <h1>${testTitle} Report</h1>
        <div class="report">
          <p><strong>Student Name:</strong> ${studentName}</p>
          <p><strong>Test:</strong> ${testTitle}</p>
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