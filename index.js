import {LEVEL, OBJECT_TYPE} from "./setup";
//classes
import GameBoard from './GameBoard';
import Pacman from './Pacman';

//DOM elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

//Game Constants
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; //ms
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

//Initial Setup
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false;
let powerPillTimer = false;


function gameOver(pacman, grid) {

}

function checkCollision(pacman, ghosts) {

}

function gameLoop(pacman, ghosts) {

}

function startGame() {
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
}

startButton.addEventListener('click', startGame);
