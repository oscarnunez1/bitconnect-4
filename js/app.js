/*-------------------------------- Constants --------------------------------*/

winningConnect = [
    // hoizontal combinations
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], 
    [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13], 
    [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
    [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
    [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
    [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],

    // vertical combinations
    [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
    [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
    [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
    [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
    [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
    [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
    [6, 13, 20, 27], [14, 20, 27, 34], [20, 27, 34, 41],

    // diagonal combinations
    [3, 9, 15, 21], [4, 10, 16, 22], [10, 16, 22, 4],
    [5, 11, 17, 23], [11, 17, 23, 29], [17, 23, 29, 35],
    [6, 12, 18, 24], [12, 18, 24, 30], [18, 24, 30, 36],
    [13, 19, 25, 31], [19, 25, 31, 37], [20, 26, 32, 37],
    [3, 11, 19, 27], [2, 10, 18, 26], [10, 18, 26, 34],
    [1, 9, 17, 25], [9, 17, 25, 33], [17, 25, 33, 41], 
    [0, 8, 16, 24],[8, 16, 24, 32], [16, 24, 32, 40], 
    [7, 15, 23, 31], [15, 23, 31, 39], [14, 22, 30, 38]
]

/*---------------------------- Variables (state) ----------------------------*/

let board, currentPlayer, tie , winner



/*------------------------ Cached Element References ------------------------*/

const slotElements = document.querySelectorAll(".slot")

const messageElement = document.querySelector(".message")

const resetBtnElement = document.querySelector("#clear-board")


/*----------------------------- Event Listeners -----------------------------*/

slotElements.forEach(function(space) {
    space.addEventListener("click", handleClick)
})

resetBtnElement.addEventListener("click", loadBoard)

/*-------------------------------- Functions --------------------------------*/

loadBoard()

function loadBoard(evt) {
    board = [null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null
    ] 
    currentPlayer = 1
    winner = false
    tie = false
    render()
}

console.log(tie);

function render(evt) {
    updateBoard()
    updateMessage()
}

function updateBoard() {
    board.forEach(function(space, index) {
        if (space === 1) {
            return slotElements[index].style.backgroundColor = "red"
        } else if (space === -1) {
            return slotElements[index].style.backgroundColor = "yellow"
        }
    })
}

function updateMessage() {

    if(!winner && !tie){
        messageElement.innerText = `It's ${currentPlayer > 0 ? 'Red' : 'Yellow'}'s turn`
    } else if(!winner && tie) {
        messageElement.innerText = `Tie game`
    } else {
        messageElement.innerText = `${currentPlayer > 0 ? 'Red' : 'Yellow'} wins!`
    }
}


function handleClick(evt) {
    const slIdx = parseInt(evt.target.id.slice(2))
    if (board[slIdx] !== null) return
    if (winner === true) return
    placePiece(slIdx)
    checkForTie()
    console.log("tie", tie);
    checkForWinner()
    switchPlayerTurn()
    render()
}

function placePiece (index) {
    board[index] = currentPlayer
}

function checkForTie() {
    if (!board.includes(null)) {
        console.log("????");
        tie = true
    }
}


function checkForWinner() {
    winningConnect.forEach(function(connectArray) {
        let sum = connectArray.reduce(function(prev, num) {
            return prev + board[num]
        }, 0)
        if (Math.abs(sum) === 4) {
            winner = true
            console.log("Checking for winner", winner);
        }
    })
}

function switchPlayerTurn() {
    if (winner === true) {
        return
    } else {
        currentPlayer = currentPlayer * -1
    }
}

function resetBoard(){

}