# Adaptive Skills Test Platform

This platform provides adaptive tests to evaluate skills for various disciplines, helping students determine their suitability for specific roles or classes. It includes tests for Programming, Yearbook, DSLR Photography, and Basic Robotics, hosted on GitHub Pages using HTML, CSS, and JavaScript with CSV-based question data.

## Features
- **Student Name Input**: Enter a name before starting the test, included in results and reports.
- **Test Selection**: Choose from four tests via a dropdown menu (start button disabled until a test is selected):
  - **Programming Skills Test**: Assesses Java control structures, objects, and collections (e.g., ArrayList) for AP/IB Computer Science preparation.
  - **Yearbook Skills Test**: Evaluates writing, graphics, photography, design/layout, sidebar, and leadership.
  - **DSLR Photography Skills Test**: Tests camera operation, composition, lighting, editing, and creative vision for roles like photographer or editor.
  - **Basic Robotics Skills Test**: Assesses programming, building, driving, documentation, and leadership for robotics roles.
- **Adaptive Testing**: Adjusts question difficulty (increases for correct, decreases for incorrect).
- **Scoring**: Awards points based on difficulty (10 points per level, max 50 per question).
- **Feedback**: Immediate feedback and role/class recommendations after 10 questions.
- **Printable Report**: Generates an HTML report with name, test type, score, recommendation, and date, printable via browser.
- **GitHub Pages Compatible**: Fully client-side, using Tailwind CSS (via CDN).

## File Structure
- `index.html`: HTML with name input, test selection, start button, test interface, and print button.
- `styles.css`: Custom CSS for styling, including input, buttons, and options.
- `script.js`: JavaScript for CSV loading, adaptive logic, UI updates, and report generation.
- `questions_programming.csv`: Questions for Programming Skills Test (Java-focused for AP/IB).
- `questions_yearbook.csv`: Questions for Yearbook Skills Test.
- `questions_photography.csv`: Questions for DSLR Photography Skills Test.
- `questions_robotics.csv`: Questions for Basic Robotics Skills Test.

## Setup Instructions
1. **Clone or Download**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. **Add Files**: Ensure all files (`index.html`, `styles.css`, `script.js`, and all CSV files) are in the repository root.
3. **Customize Questions** (optional):
   - Edit the respective CSV to add/modify questions.
   - Format: `id,question,option1,option2,option3,option4,correct,difficulty,topic`
   - `correct`: Option number (1-4), `difficulty`: 1-5, `topic`: Test-specific (e.g., `control structures`, `composition`).
4. **Deploy to GitHub Pages**:
   - Create a GitHub repository (e.g., `<your-username>/skills-test`).
   - Push files to `main` or `gh-pages` branch.
   - Enable GitHub Pages in repository settings, selecting the branch.
   - Access at `https://<your-username>.github.io/<your-repo-name>`.

## Usage
- Open the test via the GitHub Pages URL.
- Enter your name (optional, defaults to "Anonymous").
- Select a test (Programming, Yearbook, Photography, or Robotics) from the dropdown; the Start button enables once selected.
- Click Start to begin the test.
- Answer 10 questions by clicking an option.
- Receive immediate feedback (correct/incorrect with correct answer).
- After 10 questions, view score, recommendation, and a Print Report button:
  - **Programming**: Advanced class suitability for AP/IB Java (threshold: 80% or 400/500 points).
  - **Yearbook/Photography/Robotics**: Suggested roles based on top topics.
- Click Print Report to open a new window with a summary (name, test, score, recommendation, date); use browser print (Ctrl+P or Cmd+P).
- Switch tests via dropdown to restart; retake by refreshing or reselecting.

## Customization
- **Add Questions**: Append rows to the relevant CSV with unique IDs.
- **Test Length**: Modify `totalQuestions` in `script.js` (default: 10).
- **Scoring**: Adjust formula in `script.js` (`score += q.difficulty * 10`).
- **Styling**: Edit `styles.css` or Tailwind classes in `index.html`.
- **Recommendations**: Adjust threshold in `showResults()` or `getTopTopics()` in `script.js`.
- **Report**: Modify the report HTML in the `print-btn` event listener in `script.js`.
- **Topics**: Adjust CSV topics to align with specific roles/skills (e.g., Java-specific for Programming).

## Notes
- Fully client-side, ideal for GitHub Pages.
- CSV files must be in the repository root for `fetch` API.
- Programming test uses Java syntax to align with AP/IB Computer Science curricula.
- Name input and report enhance personalization, aligning with your interest in educational tools.
- Backend needed for saving results (not supported on GitHub Pages).

## License
MIT License. Free to use, modify, and distribute.

## Contact
Open a GitHub issue or contact [your contact info] for support.