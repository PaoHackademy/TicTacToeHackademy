const tiles = document.querySelectorAll(".tile");
const jugador_X = "X";
const jugador_O = "O";
let turn = jugador_X;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elementos
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

tiles.forEach(tile=>tile.addEventListener("click", tileClick));


function setHoverText () { //remove all hover text
    document.getElementById("turn").innerText = turn
    tiles.forEach ((tile) => {
        tile.classList.remove("x-hover");
        tile.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    tiles.forEach(tile=>{
        if(tile.innerText == "") {
            tile.classList.add(hoverClass);
        }
    });
    }

    setHoverText();


function tileClick(event) {
    if(gameOverArea.classList.contains("visible")) {
        return;
    }

    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if (tile.innerText != "") {
        return;
    }

    if (turn === jugador_X){
        tile.innerText = jugador_X;
        boardState[tileNumber -1] = jugador_X;
        turn = jugador_O;
    } else {
        tile.innerText = jugador_O;
        boardState[tileNumber -1] = jugador_O;
        turn = jugador_X;
    }

    setHoverText();
    checkWinner();
}

function checkWinner() {
    //Checar ganador
    for (const winningCombination of winningCombinations) {
        //Object Destructuring
        const { combo, strikeClass } = winningCombination;
        const tileValue1 = boardState[combo[0] - 1];
        const tileValue2 = boardState[combo[1] - 1];
        const tileValue3 = boardState[combo[2] - 1];

        if(
            tileValue1 != null && 
            tileValue1 === tileValue2 && 
            tileValue1 === tileValue3 
        ) {
            strike.classList.add(strikeClass);
            gameOverScreen(tileValue1);
            return;
        }
}


    //Checar empate
    const allTileFilledIn = boardState.every((tile) => tile !== null);
    if (allTileFilledIn) {
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText){
    let text = "¡Empate!";
    if(winnerText != null){
        text = `¡El ganador es ${winnerText}!`;
    }
    gameOverArea.className = "visible";
    gameOverText.innerText = text;
}

function startNewGame (){
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    tiles.forEach((tile) => (tile.innerText = ""));
    turn = jugador_X;
    setHoverText();
}

const winningCombinations = [
    //filas
    {combo:[1,2,3], strikeClass: "strike-row-1"},
    {combo:[4,5,6], strikeClass: "strike-row-2"},
    {combo:[7,8,9], strikeClass: "strike-row-3"},
    //columnas
    {combo:[1,4,7], strikeClass: "strike-column-1"},
    {combo:[2,5,8], strikeClass: "strike-column-2"},
    {combo:[3,6,9], strikeClass: "strike-column-3"},
        //diagonales
        {combo:[1,5,9], strikeClass: "strike-diagonal-1"},
        {combo:[3,5,7], strikeClass: "strike-diagonal-2"},
];