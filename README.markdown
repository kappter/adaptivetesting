# Adaptive Skills Test

This is an adaptive test platform for evaluating skills, offering two tests: a Programming Skills Test for incoming programming students and a Yearbook Skills Test for yearbook students. It assesses skills in relevant areas and is hosted on GitHub Pages, built with HTML, CSS, and JavaScript, using CSV files for question data.

## Features
- **Test Selection**: Choose between Programming Skills Test (control structures, objects, collections) or Yearbook Skills Test (writing, graphics, photography, design/layout, sidebar, leadership) via a dropdown menu.
- **Adaptive Testing**: Adjusts question difficulty based on performance (increases for correct answers, decreases for incorrect).
- **Scoring**: Awards points based on question difficulty (10 points per difficulty level, max 50 per question).
- **Feedback**: Provides immediate feedback on answers and a final recommendation for class placement or yearbook roles.
- **GitHub Pages Compatible**: Fully client-side, using Tailwind CSS (via CDN) for styling.

## File Structure
- `index.html`: Main HTML file with the test interface and test selection dropdown.
- `styles.css`: Custom CSS styles for the test, including dropdown and option styling.
- `script.js`: JavaScript logic for loading questions, handling test selection, adaptive testing, and UI updates.
- `questions_programming.csv`: CSV file with questions for the Programming Skills Test.
- `questions_yearbook.csv`: CSV file with questions for the Yearbook Skills Test.

## Setup Instructions
1. **Clone or Download**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. **Add Files**: Ensure `index.html`, `styles.css`, `script.js`, `questions_programming.csv`, and `questions_yearbook.csv` are in the repository root.
3. **Customize Questions** (optional):
   - Edit `questions_programming.csv` or `questions_yearbook.csv` to add or modify questions.
   - Format: `id,question,option1,option2,option3,option4,correct,difficulty,topic`
   - `correct` is the option number (1-4), `difficulty` is 1-5, `topic` varies by test (e.g., `control structures`, `writing`).
4. **Deploy to GitHub Pages**:
   - Create a GitHub repository (e.g., `<your-username>/skills-test`).
   - Push all files to the `main` or `gh-pages` branch.
   - In the repository settings, enable GitHub Pages under the "Pages" section, selecting the appropriate branch.
   - Access the test at `https://<your-username>.github.io/<your-repo-name>`.

## Usage
- Open the test in a browser via the GitHub Pages URL.
- Select either "Programming Skills Test" or "Yearbook Skills Test" from the dropdown.
- Answer 10 questions by clicking an option.
- Receive immediate feedback (correct/incorrect with the correct answer).
- After 10 questions, view your score and a recommendation:
  - **Programming**: Suitability for an advanced programming class (threshold: 80% or 400/500 points).
  - **Yearbook**: Suggested roles (e.g., writing, photography) based on top-performing topics.
- To switch tests, select a different option from the dropdown to restart.
- To retake a test, refresh the page or reselect the test type.

## Customization
- **Add Questions**: Append new rows to the respective CSV file with unique IDs and appropriate fields.
- **Adjust Test Length**: Modify `totalQuestions` in `script.js` (default: 10).
- **Change Scoring**: Adjust the scoring formula in `script.js` (`score += q.difficulty * 10`).
- **Style Updates**: Edit `styles.css` for custom styling or modify Tailwind classes in `index.html`.
- **Recommendation Threshold**: Change the threshold in `showResults()` in `script.js` (default: `score >= totalQuestions * 40`).
- **Yearbook Recommendations**: Modify `getTopTopics()` in `script.js` to adjust how roles are recommended.

## Notes
- The platform is fully client-side, requiring no server-side processing, making it ideal for GitHub Pages.
- Ensure both CSV files are in the repository root, as they’re fetched via JavaScript’s `fetch` API.
- The Programming test assesses readiness for an advanced class; the Yearbook test suggests roles based on strengths.
- To track user progress across sessions, a backend would be required (not supported on GitHub Pages).

## License
MIT License. Feel free to use, modify, and distribute.

## Contact
For issues or suggestions, open an issue on the GitHub repository or contact [your contact info].