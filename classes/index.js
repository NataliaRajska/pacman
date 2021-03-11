import {LEVEL, OBJECT_TYPE} from "./setup";
import {randomMovement} from "./ghostMoves";
// Classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from "./Ghost";

// Sounds
import soundDot from '../sources/sounds/munch.wav';
import soundGameOver from '../sources/sounds/death.wav';
import soundGameStart from '../sources/sounds/game_start.wav';
import soundGhost from '../sources/sounds/eat_ghost.wav';
import soundPill from '../sources/sounds/pill.wav';

// DOM elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; //ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// Initial Setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = false;

// Audio
function playAudio(audio){
    const soundEffect = new Audio(audio);
    soundEffect.play();
}

function gameOver(pacman, grid) {
    playAudio(soundGameOver);
    document.removeEventListener('keydown', e =>
        pacman.handleKeyInput(e, gameBoard.objectExist)
    );
    gameBoard.showGameStatus(gameWin);
    clearInterval(timer);
    startButton.classList.remove('hide');

}

function checkCollision(pacman, ghosts) {
    const collideGhost = ghosts.find(ghost => pacman.pos === ghost.pos);
    if (collideGhost) {
        // Pacman eats ghost
        if (pacman.powerPill) {
            playAudio(soundGhost);
            gameBoard.removeObject(collideGhost.pos, [
                OBJECT_TYPE.GHOST,
                OBJECT_TYPE.SCARED,
                collideGhost.name
            ]);
            collideGhost.pos = collideGhost.startPos;
            score += 100;
        } else {
            // pacman die
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
            gameBoard.rotateDiv(pacman.pos, 0);
            gameOver(pacman, gameGrid);
        }
    }
}

function gameLoop(pacman, ghosts) {
    gameBoard.moveCharacter(pacman);
    checkCollision(pacman, ghosts);

    ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
    checkCollision(pacman, ghosts);

    // Check if Pacman eats a dot
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
        playAudio(soundDot);
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
        gameBoard.dotCount--;
        score += 10;
    }

    // Check if Pacman eats a powerpill
    if(gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
        playAudio(soundPill);
        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

        pacman.powerPill = true;
        score += 50;

        clearTimeout(powerPillTimer);
        powerPillTimer = setTimeout(
            () => (pacman.powerPill = false),
            POWER_PILL_TIME
        );
    }

    // Change ghost scare mode depending on powerPill
    if( pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill;
        ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));

    }

    // Check if all dots have been eaten
    if(gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman,ghosts);
    }
    // Show the score
    scoreTable.innerHTML = score;
}

function startGame() {
    playAudio(soundGameStart);

    gameWin = false;
    powerPillActive = false;
    score = 0;

    startButton.classList.add('hide');

    gameBoard.createGrid(LEVEL);
    const pacman = new Pacman(2, 287);
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]); //add pacman on board
    document.addEventListener('keydown', (e) =>
        pacman.handleKeyInput(e, gameBoard.objectExist)
    );

    const ghosts = [
        // posiotion in the ghostbox
        new Ghost(5, 188, randomMovement, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 230, randomMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];

    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

startButton.addEventListener('click', startGame);
