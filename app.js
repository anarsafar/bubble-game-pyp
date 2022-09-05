const startGame = document.querySelector('.start-game');
const scoreBoard = document.querySelector('.score');
const gameBoard = document.querySelector('.game-board');
const input = document.querySelector('input');
const easyButton = document.querySelector('.easy-button')
const mediumButton = document.querySelector('.medium-button')
const hardButton = document.querySelector('.hard-button');

const name = document.querySelector('.name');
const stopButton = document.querySelector('.stop-button');
var audio = new Audio('./mixkit-cartoon-bubbles-popping-732.wav');

let score = 0;
let scoreValue = 1;

let gameMode = 3000;

let clear = null
let xCoord, yCoord = null;

const easyMode = 3000;
const mediumMode = 2000;
const hardMode = 1000;

const yCoordMax = 360;
const xCoordMax = 360;
const maxBubbles = 50;

startGame.addEventListener('click', () => {

    if (input.value) {
        name.innerHTML = input.value;
        clear = setInterval(() => {
            const randomX = Math.floor(Math.random() * xCoordMax);
            const randomY = Math.floor(Math.random() * yCoordMax);


            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.top = `${randomX}px`;
            bubble.style.left = `${randomY}px`;

            gameBoard.appendChild(bubble);
            console.log(randomX, randomY);

            bubble.addEventListener('click', () => {
                audio.play();
                bubble.style.display = "none";
                score += scoreValue;
                scoreBoard.textContent = score
            })

            if (gameBoard.childNodes.length - 1 === maxBubbles) {
                clearInterval(clear);
                gameBoard.innerHTML = "";
            }

            console.log(gameMode)
        }, gameMode);
    }
});

easyButton.addEventListener('click', () => gameMode = easyMode, scoreValue = 1);

mediumButton.addEventListener('click', () => {
    gameMode = mediumMode;
    scoreValue = 2;
});

hardButton.addEventListener('click', () => gameMode = hardMode, scoreValue = 3);

stopButton.addEventListener('click', () => {
    clearInterval(clear);
    gameBoard.innerHTML = "";
});