
board = [
    ['_','_','_'],
    ['_','_','_'],
    ['_','_','_']
];

isOver = false;
isFirst = true;
var firstPlayer;

class Move {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

function displayBoard(b) {
    for (let row=0; row<3; row++) {
        console.log(board[row])
    }
    console.log('\n');
}

function isMovesLeft(b) {
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (b[i][j] === '_') {
                return true;
            }
        }
    }
    return false;
}

function evaluate(b) {
    for (let row=0; row<3; row++) {
        if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
            if (b[row][0] === 'x') {
                return 10;
            }
            if (b[row][0] === 'o') {
                return -10;
            }
        }
    }
    for (let col=0; col<3; col++) {
        if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
            if (b[0][col] === 'x') {
                return 10;
            }
            if (b[0][col] === 'o') {
                return -10;
            }
        }
    }
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
        if (b[0][0] === 'x') {
            return 10;
        }
        if (b[0][0] === 'o') {
            return -10;
        }
    }
    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
        if (b[0][2] === 'x') {
            return 10;
        }
        if (b[0][2] === 'o') {
            return -10;
        }
    }
    return 0;
}

function minimax(alpha, beta ,depth=1, turn='o') {

    let score = evaluate(board);
    if (score === 10 || score === -10) {
        return score-depth;
    }
    if (isMovesLeft(board) === false) {
        return 0-depth;
    }

    if (turn === 'x') {
        let bestAI = -1000;
        for (let row=0; row<3; row++) {
            for (let col=0; col<3; col++) {
                if (board[row][col] === '_') {
                    board[row][col] = 'x';
                    let val = minimax(alpha, beta, depth+1, 'o');
                    board[row][col] = '_';
                    bestAI = Math.max(val, bestAI);
                    alpha = Math.max(alpha, bestAI);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }

        return bestAI;
    }

    if (turn === 'o') {
        let bestHuman = Infinity;
        for (let row=0; row<3; row++) {
            for (let col=0; col<3; col++) {
                if (board[row][col] === '_') {
                    board[row][col] = 'o';
                    let val = minimax(alpha, beta, depth+1, 'x');
                    board[row][col] = '_';
                    bestHuman = Math.min(val, bestHuman);
                    beta = Math.min(beta, bestHuman);
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
        }
        return bestHuman;
    }
}

function findBestMove() {
    let bestMove = new Move(-1,-1);
    let bestScore = -Infinity;
    for (let row=0; row<3; row++) {
        for (let col=0; col<3; col++) {
            if (board[row][col] === '_') {
                board[row][col] = 'x';
                let temp = minimax(-Infinity, Infinity);

                board[row][col] = '_';
                if (temp > bestScore) {
                    bestMove.row = row;
                    bestMove.col = col;
                    bestScore = temp;
                }
            }
        }
    }
    return bestMove;
}

function findBestMove_2() {
    let bestMove = new Move(-1,-1);
    let bestScore = Infinity;
    for (let row=0; row<3; row++) {
        for (let col=0; col<3; col++) {
            if (board[row][col] === '_') {
                board[row][col] = 'x';
                let temp = minimax(-Infinity, Infinity,depth=1,turn='x');

                board[row][col] = '_';
                if (temp < bestScore) {
                    bestMove.row = row;
                    bestMove.col = col;
                    bestScore = temp;
                }
            }
        }
    }
    return bestMove;
}

function occupyBox(obj) {
    // This function occupies a box with either X or O depending on number of emtpy boxes
    boxes = document.querySelectorAll(".box");
    empty_boxes = 0;
    for (let i=0; i<9; i++) {
        if (boxes[i].innerHTML === " ") {
            empty_boxes += 1
        }
    }
    if (empty_boxes%2 === 1) {
        obj.innerHTML = "❌";
        obj.value = "x";
    } else {
        obj.innerHTML = "⭕";
        obj.value = "o";
    }
}

function updateBoard() {
    // This function updates the gameBoard
    boxes = document.querySelectorAll(".box");
    for (let i=0; i<9; i++) {
        var value
        if (boxes[i].innerHTML === "❌") {
            value = "x"
        }
        if (boxes[i].innerHTML === "⭕") {
            value = "o"
        }
        if (boxes[i].innerHTML === " ") {
            value = "_"
        }
        board[parseInt(boxes[i].id[1])-1][parseInt(boxes[i].id[2])-1] = value;
    }
}

function resetBoard() {
    boxes = document.querySelectorAll(".box");
    second = document.querySelector("#second");
    first = document.querySelector("#first");

    for (let i=0; i<9; i++) {
        boxes[i].innerHTML = " ";
    }
    isOver = false;
    first.style.backgroundColor = "lightgrey";
    second.style.backgroundColor = "lightgrey";
    isFirst = true;
}

function isGameOver() {
    score = evaluate(board);
    second = document.querySelector("#second");
    first = document.querySelector("#first");

    if (score===10 || score ===-10) {
        isOver = true;
        board = [
    ['_','_','_'],
    ['_','_','_'],
    ['_','_','_']
];
        alert("Game Over")
        first.style.backgroundColor = "lightgrey";
        second.style.backgroundColor = "lightgrey";
        isFirst = true;
    }
    if (!isMovesLeft(board)) {
        isOver = true;
        board = [
    ['_','_','_'],
    ['_','_','_'],
    ['_','_','_']
];
        alert("Game Over")
        first.style.backgroundColor = "lightgrey";
        second.style.backgroundColor = "lightgrey";
        isFirst = true;
    }
}

function makeMove(obj) {

    if (isMovesLeft(board) && !isOver) {
        occupyBox(obj);
        updateBoard();

        // Gets number of empty boxes
        empty_boxes = 0;
        for (let i = 0; i < 9; i++) {
            if (boxes[i].innerHTML === " ") {
                empty_boxes += 1
            }
        }
        // Computer makes move if the number of empty boxes are odd
        if (empty_boxes % 2 === firstPlayer && empty_boxes !== 0) {
            bestMove = findBestMove();
            div_id = "_" + String(bestMove.row + 1) + String(bestMove.col + 1);
            box = document.getElementById(div_id);
            occupyBox(box);
            updateBoard();
        }

    }

    isGameOver();
}

function firstMove(obj) {
    if (isFirst) {
        if (obj.innerHTML === "⭕") {
            bestMove = findBestMove();
            div_id = "_" + String(bestMove.row + 1) + String(bestMove.col + 1);
            box = document.getElementById(div_id);
            firstPlayer = 1;
            makeMove(box);
        }
        if (obj.innerHTML === "❌") {
            firstPlayer = 0;
        }
        obj.style.backgroundColor = "dodgerblue";
        isFirst = false;
    }
}
