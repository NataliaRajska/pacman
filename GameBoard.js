import { GRID_SIZE CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from "./setup";

export class GameBoard {

    constructor(DOMGrid) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid = DOMGrid;
    }

    showGameStatus(gameWin){
        const div = document.createElement('div');
        div.classList.add('game-status');
        div.innerHTML = `${gameWin ? 'WIN!' : 'GAME OVER'}`;
        this.DOMGrid.appendChild(div);
    }
}
