const difficulties = [
    { name: 'Difficulty 1', score: 0 },
    { name: 'Difficulty 2', score: 0 },
    { name: 'Difficulty 3', score: 0 },
    { name: 'Difficulty 4', score: 0 },
    { name: 'Difficulty 5', score: 0 },
    { name: 'Difficulty 6', score: 0 },
    { name: 'Difficulty 7', score: 0 },
    { name: 'Difficulty 8', score: 0 },
    { name: 'Difficulty 9', score: 0 },
    { name: 'Difficulty 10', score: 0 }
];

function loadScores() {
    difficulties.forEach((difficulty, index) => {
        const savedScore = localStorage.getItem(`difficulty_${index}_score`);
        if (savedScore !== null) {
            difficulty.score = parseInt(savedScore, 10);
        }
    });
}

function saveScore(index) {
    localStorage.setItem(`difficulty_${index}_score`, difficulties[index].score);
}

function createDifficultyElement(difficulty, index) {
    const container = document.createElement('div');
    container.className = 'difficulty';

    const title = document.createElement('h3');
    title.innerText = difficulty.name;
    container.appendChild(title);

    const score = document.createElement('div');
    score.className = 'score';
    score.innerText = difficulty.score;
    container.appendChild(score);

    const incrementButton = document.createElement('button');
    incrementButton.innerText = '+';
    incrementButton.onclick = () => {
        updateScore(index, 1);
    };
    container.appendChild(incrementButton);

    const decrementButton = document.createElement('button');
    decrementButton.innerText = '-';
    decrementButton.onclick = () => {
        updateScore(index, -1);
    };
    container.appendChild(decrementButton);

    const resetButton = document.createElement('div');
    resetButton.className = 'reset-difficulty';
    resetButton.innerText = 'Reset';
    resetButton.onclick = () => {
        resetScore(index);
    };
    container.appendChild(resetButton);

    return container;
}

function updateScore(index, delta) {
    difficulties[index].score += delta;
    if (difficulties[index].score < 0) {
        difficulties[index].score = 0;
    }
    saveScore(index);
    renderScores();
}

function resetScore(index) {
    difficulties[index].score = 0;
    saveScore(index);
    renderScores();
}

function renderScores() {
    const container = document.querySelector('.difficulty-container');
    container.innerHTML = '';
    difficulties.forEach((difficulty, index) => {
        const difficultyElement = createDifficultyElement(difficulty, index);
        container.appendChild(difficultyElement);
    });
}

document.getElementById('reset-all').addEventListener('click', () => {
    difficulties.forEach((difficulty, index) => {
        difficulty.score = 0;
        saveScore(index);
    });
    renderScores();
});

loadScores();
renderScores();
