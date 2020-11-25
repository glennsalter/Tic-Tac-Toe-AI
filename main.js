var isOver = false;
var isFirst = true;
var isStart = false;
var firstPlayer;
textBox = document.querySelector("input[type='text']");
function occupyBox(obj) {
    boxes = document.querySelectorAll(".box");
    empty_boxes = 0;
    for (let i=0; i<9; i++) {
        if (boxes[i].innerHTML === " ") {empty_boxes += 1}
    }
    if (empty_boxes%2 === 1) {
        if (obj.innerHTML === " ") {obj.innerHTML = "❌";}
    }
    else {
        if (obj.innerHTML === " ") {obj.innerHTML = "⭕";}
    }
}
function updateBoard() {
    boxes = document.querySelectorAll(".box");
    for (let i=0; i<9; i++) {
        var value
        if (firstPlayer===1) {
            if (boxes[i].innerHTML === "❌") {value = "x"}
            if (boxes[i].innerHTML === "⭕") {value = "o"}
        }
        if (firstPlayer===0) {
            if (boxes[i].innerHTML === "❌") {value = "o"}
            if (boxes[i].innerHTML === "⭕") {value = "x"}
        }
        if (boxes[i].innerHTML === " ") {value = "_"}
        board[parseInt(boxes[i].id[1])-1][parseInt(boxes[i].id[2])-1] = value;
    }
}
function resetBoard() {
    boxes = document.querySelectorAll(".box");
    second = document.querySelector("#second");
    first = document.querySelector("#first");
    for (let i=0; i<9; i++) {boxes[i].innerHTML = " ";}
    board = [['_','_','_'], ['_','_','_'], ['_','_','_']];
    isOver = false;
    isFirst = true;
    isStart = false;
    textBox.value = "Pick ❌ or ⭕";
}
function displayMessage(msg1, msg2="",time=1000) {
    textBox.value = msg1;
    setTimeout(function () {textBox.value = msg2;},time)
}
function isGameOver() {
    score = evaluate(board);
    console.log(score);
    if (score===10 || score ===-10) {
        isOver = true;
        if (score===10) {
            displayMessage("AI Wins! Good Luck Next Time", "Pick ❌ or ⭕", 4000);
            alert("AI Wins");
        }
        if (score===-10) {
            displayMessage("Congratulations, You Win!", "Pick ❌ or ⭕", 4000);
            alert("You Win");
        }
        setTimeout(resetBoard, 1000);
    }
    if (!isMovesLeft(board)) {
        isOver = true;
        displayMessage("Draw! Nobody Won.", "Pick ❌ or ⭕", 4000);
        alert("Draw!");
        setTimeout(resetBoard, 1000);
    }
}
function makeMove(obj) {
    if (!isOver && isStart) {
        occupyBox(obj);
        updateBoard();
        empty_boxes = 0;
        for (let i = 0; i < 9; i++) {
            if (boxes[i].innerHTML === " ") {empty_boxes += 1}
        }
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
            firstPlayer = 1;
            bestMove = findBestMove();
            div_id = "_" + String(bestMove.row + 1) + String(bestMove.col + 1);
            box = document.getElementById(div_id);
            makeMove(box);
            displayMessage("You chose ⭕, go second.","Your Move...");
        }
        if (obj.innerHTML === "❌") {
            firstPlayer = 0;
            displayMessage("You chose ❌, go first. AI is waiting...","Your Move...",2000);
        }
        isFirst = false;
    }
}
