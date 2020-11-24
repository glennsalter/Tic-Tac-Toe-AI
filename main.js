
isOver = false;
isFirst = true;
isStart = false;
var firstPlayer;
textBox = document.querySelector("input[type='text']");

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
    isFirst = true;
    isStart = false;
    textBox.value = "Pick ❌ or ⭕";
}

function isGameOver() {
    score = evaluate(board);

    if (score===10 || score ===-10) {
        isOver = true;
        board = [
    ['_','_','_'],
    ['_','_','_'],
    ['_','_','_']
];
        if (score===10) {
            displayMessage("AI Wins! Good Luck Next Time", "Pick ❌ or ⭕", 4000);
        }
        if (score===-10) {
            displayMessage("Congratulations, You Win!", "Pick ❌ or ⭕", 4000);
        }
        setTimeout(resetBoard, 1000);
    }
    if (!isMovesLeft(board)) {
        isOver = true;
        board = [
    ['_','_','_'],
    ['_','_','_'],
    ['_','_','_']
];
        displayMessage("Draw! Nobody Won.", "Pick ❌ or ⭕", 4000)
        setTimeout(resetBoard, 1000);
    }
}

function makeMove(obj) {

    if (isMovesLeft(board) && !isOver && isStart) {
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
            displayMessage("AI Made a Move...", "Your Move...")
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
    textBox = document.querySelector("input[type='text']");
    isStart = true;
    if (isFirst) {
        if (obj.innerHTML === "⭕") {

            bestMove = findBestMove();
            div_id = "_" + String(bestMove.row + 1) + String(bestMove.col + 1);
            box = document.getElementById(div_id);
            firstPlayer = 1;
            makeMove(box);
            displayMessage("You chose ⭕, go second.","Your Move...")
        }
        if (obj.innerHTML === "❌") {
            firstPlayer = 0;
            displayMessage("You chose ❌, go first. AI is waiting...","",2000)
        }
        isFirst = false;
    }
}

function displayMessage(msg1, msg2="",time=1000) {
    textBox.value = msg1;
    setTimeout(function () {
        textBox.value = msg2;
    },time)
}
