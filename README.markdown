# Adaptive Skills Test Platform

[This platform](https://kappter.github.io/adaptivetesting/) provides adaptive tests to evaluate skills for various disciplines, helping students determine their suitability for specific roles or classes. It includes tests for IB Computer Science, AP Computer Science A, Yearbook, DSLR Photography, and Basic Robotics, hosted on GitHub Pages using HTML, CSS, and JavaScript with CSV-based question data.

## Features
- **Student Name Input**: Enter a name before starting, included in results and reports.
- **Test Selection**: Choose from five tests via a dropdown (start button disabled until selected):
  - **IB Computer Science Test**: Assesses Java-based computational thinking, algorithms, programming, data structures, and OOP for SL/HL preparation.
  - **AP Computer Science A Test**: Evaluates Java variables, control structures, classes, and collections for AP exam readiness.
  - **Yearbook Skills Test**: Tests skills in Design, Photography, Copywriting, Sidebar, Interviewing, Captioning, and Leadership to recommend a specific yearbook team role.
  - **DSLR Photography Skills Test**: Covers camera operation, composition, lighting, editing, and creative vision.
  - **Basic Robotics Skills Test**: Tests skills in Coder, Driver, Builder, Documenter, and Leader roles to recommend a specific robotics team role, with Leader requiring strength across multiple skills.
- **Adaptive Testing**: Adjusts question difficulty (increases for correct, decreases for incorrect) without repeating questions, including back-to-back duplicates, within a session.
- **Scoring**: Awards points based on difficulty (10 points per level, max 50 per question).
- **Feedback**: Immediate feedback (correct in cyan-teal, incorrect in deep pink-magenta) with selected answers highlighted in bright blue until "Next" is clicked.
- **Printable Report**: HTML report with student name, dynamic test title (e.g., "Basic Robotics Skills Test"), score, recommendation, and date, printable via browser.
- **Fixed Footer**: Themed background (mustard yellow) with styled dark navy links (underlined on hover) for related resources.
- **Custom Color Theme**: Uses hex colors 2BAFB9 (cyan-teal), E1E9E0 (light grayish-white), C71E5D (deep pink-magenta), 1525D1 (bright blue), and 10054E (dark navy), with white test tile backdrop.
- **Dynamic Title**: Title updates to reflect the selected test (e.g., "Basic Robotics Skills Test"), also shown in the report.
- **Role Recommendation**: Recommends a specific role for yearbook (Design, Photography, etc.) or robotics (Coder, Driver, Builder, Documenter, Leader) based on performance.
- **Start Button Behavior**: Start button visually transitions to an enabled state (bright blue, clickable) when a test is selected, ensuring clarity.
- **No Question Repeats**: Questions, such as "How can a leader resolve team conflicts?", are guaranteed not to repeat, including back-to-back, within a 10-question test session, enhancing professionalism.
- **Centered Layout**: Fixed-width test area (672px) centered on the page for consistent presentation.
- **GitHub Pages Compatible**: Fully client-side.

## File Structure
- `index.html`: HTML with name input, test selection, start button, test interface, print button, and themed fixed footer.
- `styles.css`: Custom CSS for styling input, buttons, options, footer, and color theme.
- `script.js`: JavaScript for CSV loading, adaptive logic, UI updates, dynamic title, role-specific recommendations, and report generation.
- `questions_ib_computer_science.csv`: Questions for IB Computer Science Test (Java-focused).
- `questions_ap_computer_science.csv`: Questions for AP Computer Science A Test (Java-focused).
- `questions_yearbook.csv`: Questions for Yearbook Skills Test, covering Design, Photography, Copywriting, Sidebar, Interviewing, Captioning, and Leadership.
- `questions_photography.csv`: Questions for DSLR Photography Skills Test.
- `questions_robotics.csv`: Expanded questions for Basic Robotics Skills Test, covering Coder, Driver, Builder, Documenter, and Leader.

## Setup Instructions
1. **Clone or Download**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. **Add Files**: Ensure all files (`index.html`, `styles.css`, `script.js`, and all CSVs) are in the repository root.
3. **Customize Questions** (optional):
   - Edit the respective CSV to add/modify questions, ensuring unique `id` values.
   - Format: `id,question,option1,option2,option3,option4,correct,difficulty,topic`
   - `correct`: Option number (1-4), `difficulty`: 1-5, `topic`: For robotics, use Coder, Driver, Builder, Documenter, or Leader; for yearbook, use Design, Photography, Copywriting, Sidebar, Interviewing, Captioning, or Leadership.
4. **Customize Footer Links** (optional):
   - Edit `index.html` to replace placeholder `#` URLs in the footer with actual links (e.g., portfolio, tool pages).
5. **Customize Colors** (optional):
   - Modify `:root` variables in `styles.css` to adjust the color theme (hex codes: 2BAFB9, E1E9E0, C71E5D, 1525D1, 10054E).
6. **Deploy to GitHub Pages**:
   - Create a GitHub repository (e.g., `<your-username>/skills-test`).
   - Push files to `main` or `gh-pages` branch.
   - Enable GitHub Pages in repository settings, selecting the branch.
   - Access at `https://<your-username>.github.io/<your-repo-name>`.

## Usage
- Open the test via the GitHub Pages URL.
- Enter your name (optional, defaults to "Anonymous").
- Select a test (e.g., "Yearbook Skills Test") from the dropdown; the title updates, and the Start button changes to a bright blue, clickable state.
- Click Start to begin.
- Answer 10 unique questions (no repeats, including back-to-back like "How can a leader resolve team conflicts?") by clicking an option; the selected option is highlighted in bright blue (1525D1) until "Next" is clicked.
- Receive immediate feedback (correct in cyan-teal 2BAFB9, incorrect in deep pink-magenta C71E5D).
- After 10 questions, view score and recommendation, then click "Print Report" to generate a report with the test title (e.g., "Yearbook Skills Test Report"):
  - **IB/AP**: Readiness for SL/HL or AP exam (threshold: 80% or 400/500 points).
  - **Yearbook/Robotics**: Recommends a specific role (e.g., "You are well-suited for the Leadership role on the yearbook team!").
  - **Photography**: Suggested roles based on top topics.
- The fixed footer displays a mustard yellow background with dark navy (10054E, hover to 1525D1) links at the bottom.
- The test area is centered with a fixed width (672px) and white backdrop for a clean, focused interface.

## Customization
- **Add Questions**: Append rows to the relevant CSV with unique IDs, ensuring no duplicate questions or IDs.
- **Test Length**: Modify `totalQuestions` in `script.js` (default: 10).
- **Scoring**: Adjust formula in `script.js` (`score += q.difficulty * 10`).
- **Styling**: Edit `styles.css` to adjust colors, fonts, or layout.
- **Footer**: Update footer links in `index.html` to point to specific URLs.
- **Recommendations**: Adjust threshold in `showResults()` or `getTopRole()` in `script.js` (e.g., tweak Leader criteria).
- **Report**: Modify report HTML in `print-btn` event listener in `script.js`.
- **Topics**: For robotics, ensure CSV topics align with Coder, Driver, Builder, Documenter, or Leader; for yearbook, use Design, Photography, Copywriting, Sidebar, Interviewing, Captioning, or Leadership.
- **Debugging**: Check console logs for question selection details if issues persist.

## Notes
- Fully client-side, ideal for GitHub Pages.
- CSV files must be in the repository root for `fetch` API.
- IB and AP tests use Java, tailored to their curricula.
- Robotics test recommends a specific role (Coder, Driver, Builder, Documenter, or Leader) based on performance, with Leader requiring strength across multiple skills.
- Yearbook test recommends a specific role (Design, Photography, etc.) with similar logic.
- Questions are guaranteed not to repeat, including back-to-back duplicates like "How can a leader resolve team conflicts?", ensuring a professional experience.
- Start button visually indicates clickability (bright blue 1525D1) when a test is selected.
- Color theme (2BAFB9, E1E9E0, C71E5D, 1525D1, 10054E) ensures high text contrast and avoids rival school green tones, with a white test tile backdrop.
- Footer uses mustard yellow background with dark navy links (10054E, hover to 1525D1); replace placeholder `#` URLs as needed.
- Selected answers are marked in bright blue (1525D1) until "Next" is clicked, distinct from feedback colors.
- Dynamic test title updates in the UI and report, aligning with your educational tool interests, such as robotics and yearbook advising.
- Centered, fixed-width test area (672px) and fixed footer maintain the preferred layout.
- Backend needed for saving results (not supported on GitHub Pages).

## License
MIT License. Free to use, modify, and distribute.

## Contact
Open a GitHub issue or contact [your contact info] for support.
