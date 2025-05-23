# Adaptive Programming Skills Test

This is an adaptive test to evaluate incoming programming students' skills in control structures, objects, and collections, designed for placement in an advanced class. The test is built with HTML, CSS, and JavaScript, uses a CSV file for question data, and is hosted on GitHub Pages.

## Features
- **Adaptive Testing**: Adjusts question difficulty based on user performance (increases for correct answers, decreases for incorrect).
- **Topics Covered**: Control structures, objects, and collections in JavaScript.
- **Scoring**: Awards points based on question difficulty (10 points per difficulty level, max 50 per question).
- **Feedback**: Provides immediate feedback on answers and a final recommendation for class placement.
- **GitHub Pages Compatible**: Fully client-side, using Tailwind CSS (via CDN) for styling.

## File Structure
- `index.html`: Main HTML file with the test interface.
- `styles.css`: Custom CSS styles for the test.
- `script.js`: JavaScript logic for loading questions, adaptive testing, and UI updates.
- `questions.csv`: CSV file containing question data (ID, question, options, correct answer, difficulty, topic).

## Setup Instructions
1. **Clone or Download**:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   ```
2. **Add Files**: Ensure `index.html`, `styles.css`, `script.js`, and `questions.csv` are in the repository root.
3. **Customize Questions** (optional):
   - Edit `questions.csv` to add or modify questions.
   - Format: `id,question,option1,option2,option3,option4,correct,difficulty,topic`
   - `correct` is the option number (1-4), `difficulty` is 1-5, `topic` is one of: `control structures`, `objects`, `collections`.
4. **Deploy to GitHub Pages**:
   - Create a GitHub repository (e.g., `<your-username>/tech-skills-test`).
   - Push all files to the `main` or `gh-pages` branch.
   - In the repository settings, enable GitHub Pages under the "Pages" section, selecting the appropriate branch.
   - Access the test at `https://<your-username>.github.io/<your-repo-name>`.

## Usage
- Open the test in a browser via the GitHub Pages URL.
- Answer 10 questions by clicking an option.
- Receive immediate feedback (correct/incorrect with the correct answer).
- After 10 questions, view your score and a recommendation for the advanced class (based on a threshold of 80% or 400/500 points).
- To retake, refresh the page.

## Customization
- **Add Questions**: Append new rows to `questions.csv` with unique IDs and appropriate fields.
- **Adjust Test Length**: Modify `totalQuestions` in `script.js` (default: 10).
- **Change Scoring**: Adjust the scoring formula in `script.js` (`score += q.difficulty * 10`).
- **Style Updates**: Edit `styles.css` for custom styling or modify Tailwind classes in `index.html`.
- **Recommendation Threshold**: Change the threshold in `showResults()` in `script.js` (default: `score >= totalQuestions * 40`).

## Notes
- The test is fully client-side, requiring no server-side processing, making it ideal for GitHub Pages.
- Ensure `questions.csv` is in the repository root, as it’s fetched via JavaScript’s `fetch` API.
- For a similar test for yearbook students (e.g., assessing writers, graphics, etc.), duplicate this structure and modify `questions.csv` and the UI/logic as needed.
- To track user progress across sessions, a backend would be required (not supported on GitHub Pages).

## License
MIT License. Feel free to use, modify, and distribute.

## Contact
For issues or suggestions, open an issue on the GitHub repository or contact [your contact info].