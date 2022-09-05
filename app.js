const startButton = document.querySelector('.start-button');
const stopButton = document.querySelector('.stop-button');
const displayName = document.querySelector('.name');
const displayScore = document.querySelector('.score');
const gameBoard = document.querySelector('.game-board');
const easyButton = document.querySelector('.easy-button')
const mediumButton = document.querySelector('.medium-button')
const hardButton = document.querySelector('.hard-button');
const initialStart = document.querySelector('.initial-start');
const intro = document.querySelector('.user-name-input');
const input = document.querySelector('input[type="text"]');
const gameContainer = document.querySelector('.game-container');
const highScore = document.querySelector('.high-score');

const audio = new Audio('./bubble-sound.wav');

const easyMode = 3000;
const mediumMode = 2000;
const hardMode = 1000;

const easyScore = 1;
const mediumScore = 2;
const hardScore = 3;

const xCoordMax = 370;
const yCoordMax = 370;

const maxBubbles = 50;

let clear, score = 0, xCoord, yCoord, gameMode = easyMode;

let player = JSON.parse(localStorage.getItem('player')) || {
    playerName: null,
    playerScore: 0
}

initialStart.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value) {
        displayName.textContent = input.value;
        highScore.textContent = player.playerScore
        player.playerName = input.value;
        intro.style.display = 'none';
        gameContainer.style.display = 'block';
    } else {
        input.classList.add('error');
        setTimeout(() => input.classList.remove('error'), 3000)
    }
})

function startGame() {
    startButton.disabled = true;
    stopButton.disabled = false;

    mediumButton.disabled = false;
    hardButton.disabled = false;

    score = 0;
    displayScore.textContent = 0;
    gameMode = easyMode;
    initGame();

}

function deleteBubble(bubble) {
    bubble.addEventListener('click', () => {
        audio.play();

        if (gameMode === easyMode) {
            score += easyScore
        } else if (gameMode === mediumMode) {
            score += mediumScore
        } else {
            score += hardScore
        }

        displayScore.textContent = score;
        player.playerScore = score

        gameBoard.removeChild(bubble);
    });
};

function initGame() {
    clear = setInterval(() => {

        if (gameBoard.childNodes.length - 1 === maxBubbles) {
            stopGame();
            return;
        };

        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        deleteBubble(bubble);

        // position bubble on game board
        const randomX = Math.floor(Math.random() * xCoordMax);
        const randomY = Math.floor(Math.random() * yCoordMax);

        bubble.style.top = `${randomX}px`;
        bubble.style.left = `${randomY}px`;

        gameBoard.appendChild(bubble);

    }, gameMode)
};

function stopGame() {
    clearInterval(clear);
    startButton.disabled = false;
    stopButton.disabled = true;

    easyButton.disabled = true;
    mediumButton.disabled = true;
    hardButton.disabled = true;

    gameBoard.innerHTML = '';
    localStorage.setItem('player', JSON.stringify(player))
}

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

easyButton.addEventListener('click', () => {
    easyButton.disabled = true;
    mediumButton.disabled = false;
    hardButton.disabled = false;

    gameMode = easyMode;
    clearInterval(clear);
    initGame()
})

mediumButton.addEventListener('click', () => {
    easyButton.disabled = false;
    mediumButton.disabled = true;
    hardButton.disabled = false;

    gameMode = mediumMode;
    clearInterval(clear);
    initGame()
})

hardButton.addEventListener('click', () => {
    easyButton.disabled = false;
    mediumButton.disabled = false;
    hardButton.disabled = true;

    gameMode = hardMode;
    clearInterval(clear);
    initGame();
})