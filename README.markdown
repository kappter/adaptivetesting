# Adaptive Skills Test Platform

This platform provides adaptive tests to evaluate skills for various disciplines, helping students determine their suitability for specific roles or classes. It includes tests for IB Computer Science, AP Computer Science A, Yearbook, DSLR Photography, and Basic Robotics, hosted on GitHub Pages using HTML, CSS, and JavaScript with CSV-based question data.

## Features
- **Student Name Input**: Enter a name before starting, included in results and reports.
- **Test Selection**: Choose from five tests via a dropdown (start button disabled until selected):
  - **IB Computer Science Test**: Assesses Java-based computational thinking, algorithms, programming, data structures, and OOP for SL/HL preparation.
  - **AP Computer Science A Test**: Evaluates Java variables, control structures, classes, and collections for AP exam readiness.
  - **Yearbook Skills Test**: Tests writing, graphics, photography, design/layout, sidebar, and leadership.
  - **DSLR Photography Skills Test**: Covers camera operation, composition, lighting, editing, and creative vision.
  - **Basic Robotics Skills Test**: Assesses programming, building, driving, documentation, and leadership.
- **Adaptive Testing**: Adjusts question difficulty (increases for correct, decreases for incorrect).
- **Scoring**: Awards points based on difficulty (10 points per level, max 50 per question).
- **Feedback**: Immediate feedback and recommendations after 10 questions.
- **Printable Report**: HTML report with name, test type, score, recommendation, and date, printable via browser.
- **Fixed Footer**: Themed background (mustard yellow) with styled links (vibrant green, underlined on hover) for related resources.
- **Custom Color Theme**: Uses hex colors A9DBB6 (light green), 6A4A62 (deep plum), 6D7D8F (steel blue), A38729 (mustard yellow), and 66EBAE (vibrant green).
- **Centered Layout**: Fixed-width test area (672px) centered on the page for consistent presentation.
- **GitHub Pages Compatible**: Fully client-side.

## File Structure
- `index.html`: HTML with name input, test selection, start button, test interface, print button, and themed fixed footer.
- `styles.css`: Custom CSS for styling input, buttons, options, footer, and color theme.
- `script.js`: JavaScript for CSV loading, adaptive logic, UI updates, and report generation.
- `questions_ib_computer_science.csv`: Questions for IB Computer Science Test (Java-focused).
- `questions_ap_computer_science.csv`: Questions for AP Computer Science A Test (Java-focused).
- `questions_yearbook.csv`: Questions for Yearbook Skills Test.
- `questions_photography.csv`: Questions for DSLR Photography Skills Test.
- `questions_robotics.csv`: Questions for Basic Robotics Skills Test.

## Setup Instructions
1. **Clone or Download**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. **Add Files**: Ensure all files (`index.html`, `styles.css`, `script.js`, and all CSVs) are in the repository root.
3. **Customize Questions** (optional):
   - Edit the respective CSV to add/modify questions.
   - Format: `id,question,option1,option2,option3,option4,correct,difficulty,topic`
   - `correct`: Option number (1-4), `difficulty`: 1-5, `topic`: Test-specific (e.g., `algorithms`, `control structures`).
4. **Customize Footer Links** (optional):
   - Edit `index.html` to replace placeholder `#` URLs in the footer with actual links (e.g., portfolio, tool pages).
5. **Customize Colors** (optional):
   - Modify `:root` variables in `styles.css` to adjust the color theme (hex codes: A9DBB6, 6A4A62, 6D7D8F, A38729, 66EBAE).
6. **Deploy to GitHub Pages**:
   - Create a GitHub repository (e.g., `<your-username>/skills-test`).
   - Push files to `main` or `gh-pages` branch.
   - Enable GitHub Pages in repository settings, selecting the branch.
   - Access at `https://<your-username>.github.io/<your-repo-name>`.

## Usage
- Open the test via the GitHub Pages URL.
- Enter your name (optional, defaults to "Anonymous").
- Select a test (IB, AP, Yearbook, Photography, or Robotics) from the dropdown; Start button enables once selected.
- Click Start to begin.
- Answer 10 questions by clicking an option.
- Receive immediate feedback (correct/incorrect with correct answer).
- After 10 questions, view score, recommendation, and Print Report button:
  - **IB/AP**: Readiness for SL/HL or AP exam (threshold: 80% or 400/500 points).
  - **Yearbook/Photography/Robotics**: Suggested roles based on top topics.
- Click Print Report for a summary (name, test, score, recommendation, date); print via browser (Ctrl+P or Cmd+P).
- The fixed footer displays a themed background (mustard yellow) with styled links (vibrant green, underlined on hover) at the bottom.
- The test area is centered with a fixed width (672px) for a clean, focused interface.

## Customization
- **Add Questions**: Append rows to the relevant CSV with unique IDs.
- **Test Length**: Modify `totalQuestions` in `script.js` (default: 10).
- **Scoring**: Adjust formula in `script.js` (`score += q.difficulty * 10`).
- **Styling**: Edit `styles.css` to adjust colors, fonts, or layout.
- **Footer**: Update footer links in `index.html` to point to specific URLs.
- **Recommendations**: Adjust threshold in `showResults()` or `getTopTopics()` in `script.js`.
- **Report**: Modify report HTML in `print-btn` event listener in `script.js`.
- **Topics**: Adjust CSV topics to align with curricula or roles.

## Notes
- Fully client-side, ideal for GitHub Pages.
- CSV files must be in the repository root for `fetch` API.
- IB and AP tests use Java, tailored to their curricula.
- Color theme (A9DBB6, 6A4A62, 6D7D8F, A38729, 66EBAE) enhances visual appeal with a themed footer and styled links.
- Footer links are placeholders (`#`); replace with actual URLs as needed.
- Centered, fixed-width test area (672px) and fixed footer align with your educational tool interests.
- Backend needed for saving results (not supported on GitHub Pages).

## License
MIT License. Free to use, modify, and distribute.

## Contact
Open a GitHub issue or contact [your contact info] for support.