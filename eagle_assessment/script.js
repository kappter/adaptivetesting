let questions = [];
let currentQuestionIndex = 0;
let answers = [];

Papa.parse('questions.csv', {
    download: true,
    header: true,
    complete: function(results) {
        questions = results.data;
        showQuestion();
    }
});

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        document.getElementById('quiz-container').innerHTML = `<h2>${q.Question}</h2>` +
            `<button onclick="selectAnswer('${q.Option1}')">${q.Option1}</button>` +
            `<button onclick="selectAnswer('${q.Option2}')">${q.Option2}</button>` +
            `<button onclick="selectAnswer('${q.Option3}')">${q.Option3}</button>` +
            `<button onclick="selectAnswer('${q.Option4}')">${q.Option4}</button>`;
    } else {
        finishQuiz();
    }
}

function selectAnswer(answer) {
    answers.push({ question: questions[currentQuestionIndex].Question, answer: answer });
    currentQuestionIndex++;
    showQuestion();
}

function finishQuiz() {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('download-report').classList.remove('hidden');
    document.getElementById('result-container').innerHTML = `<h2>Assessment Complete!</h2>`;
}

document.getElementById('download-report').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Eagle Flight Path Assessment Report', 10, 10);
    answers.forEach((a, i) => {
        doc.text(`${i + 1}. ${a.question} - ${a.answer}`, 10, 20 + i * 10);
    });
    doc.save('assessment_report.pdf');
});