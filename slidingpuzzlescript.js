const ROWS = 3;
const COLS = 3;
const SHUFFLE_TIMES = 150;

const table = document.getElementById('id_table');
const moveCounter = document.getElementById('move_count_span');
const highScoreID = document.getElementById('high_score_span');

let tableValues = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 0]
]

let moveCount = 0;
let moveStack = [];
let highScore = Number.MAX_SAFE_INTEGER;
let currEmptyRow = ROWS - 1;
let currEmptyCol = COLS - 1;
let gameOver = false;

window.onload = () => {
	
	table.focus();
	shuffleTable(SHUFFLE_TIMES);
	
	moveCount = 0;
	moveCounter.innerText = moveCount;
	
};

window.addEventListener('keydown', (event) => {
	
	event.preventDefault();
	
	if( gameOver === true ){
		return;
	}
	
	let moveHappened = executeMove(event.key);
	
	if( moveHappened == true ){
		
		moveStack.push(event.key);
		
	}
	
	if(checkWin(tableValues)){
		
		highScore = Math.min(highScore, moveCount);
		
	}
	
});

function executeMove(direction){
	
	let moveFlag = false;
	
	if( direction === 'ArrowUp' && currEmptyRow !== ROWS - 1 ){
		
		tableValues[currEmptyRow][currEmptyCol] = tableValues[currEmptyRow + 1][currEmptyCol];
		currEmptyRow += 1;
		tableValues[currEmptyRow][currEmptyCol] = 0;
		
		moveFlag = true;
		
	}
	
	else if( direction === 'ArrowRight' && currEmptyCol !== 0 ){
		
		tableValues[currEmptyRow][currEmptyCol] = tableValues[currEmptyRow][currEmptyCol - 1];
		currEmptyCol -= 1;
		tableValues[currEmptyRow][currEmptyCol] = 0;
		
		moveFlag = true;
		
	}
	
	else if( direction === 'ArrowDown' && currEmptyRow !== 0 ){
		
		tableValues[currEmptyRow][currEmptyCol] = tableValues[currEmptyRow - 1][currEmptyCol];
		currEmptyRow -= 1;
		tableValues[currEmptyRow][currEmptyCol] = 0;
		
		moveFlag = true;
		
	}
	
	else if( direction === 'ArrowLeft' && currEmptyCol !== COLS - 1 ){
		
		tableValues[currEmptyRow][currEmptyCol] = tableValues[currEmptyRow][currEmptyCol + 1];
		currEmptyCol += 1;
		tableValues[currEmptyRow][currEmptyCol] = 0;
		
		moveFlag = true;
		
	}
	
	else{
		
		return false;
		
	}
	
	if( moveFlag === true ){
		
		moveCount++;
		moveCounter.innerText = moveCount;
		updateTableHTML();
		
	}
	
	return moveFlag;
	
}

function updateTableHTML(){
    
    for (let r = 0; r < ROWS; r++) {
		
        for (let c = 0; c < COLS; c++) {
			
            const cell = table.rows[r].cells[c];
            const val = tableValues[r][c];
            
			if( val !== 0 ){
				
				cell.innerText = val;
				cell.classList.add('class_table_cell');
				cell.classList.remove('class_empty_cell');
				
			}
			else{
				
				cell.innerText = "";
				cell.classList.add('class_empty_cell');
				
			}
            
        }
		
    }
	
}

function shuffleTable(times){

	const directions = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];
	const length = directions.length;
	
	for( let i = 0; i < times; i++ ){
	
		let randomChoice = directions[Math.floor(Math.random() * length)];
		
		executeMove(randomChoice);
	
	}
	
}

function checkWin(tableValues){
	
	if ( tableValues[ROWS - 1][COLS - 1] !== 0 ) {
        return false;
    }
	
	for( let i = 0; i < ROWS * COLS - 2; i++ ){
		
		let row = Math.floor(i / COLS);
		let col = i % COLS;
	
		if( tableValues[row][col] !== (i + 1) ){
			return false;
		}
	
	}
	
	gameOver = true;
	
	return true;
	
}

function resetGame(){
	
	currEmptyRow = ROWS - 1;
	currEmptyCol = COLS - 1;
	gameOver = false;
	
	tableValues = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 0]
	]
	
	shuffleTable(SHUFFLE_TIMES);
	moveCount = 0;
	moveCounter.innerText = moveCount;
	moveStack = [];
	
	if( highScore !== Number.MAX_SAFE_INTEGER ){
		highScoreID.innerText = highScore;
	}
	
}

function rewindMove(){
	
	if( moveCount == 0 || gameOver == true ){
		return;
	}
	
	const lastMove = moveStack.pop();
	
	if( lastMove === 'ArrowUp' ){
		executeMove('ArrowDown');
	}
	
	else if( lastMove === 'ArrowLeft' ){
		executeMove('ArrowRight');
	}
	
	else if( lastMove === 'ArrowDown' ){
		executeMove('ArrowUp');
	}
	
	else if( lastMove === 'ArrowRight' ){
		executeMove('ArrowLeft');
	}
	
	moveCount -= 2;
	moveCounter.innerText = moveCount;
	
}

