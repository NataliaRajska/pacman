import { LEVEL, OBJECT_TYPE} from "./setup";

//DOM elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

//Game Constans
const POWER_PILL_TIME = 10000; //ms
const GLOBAL_SPEED = 80; //ms

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

function startGame(){

}
