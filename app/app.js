document.addEventListener("DOMContentLoaded", function(event) { 

	let Board = require('./Board');
	let _ = require('lodash');

	// Extending array prototype to check for identical values in an array
	Array.prototype.hasIdenticalValues = function() {
		for( var i = 1; i < this.length; i++)
			if( this[0] !== this[i] || !this[i]) return false;
		return true;
	};

	// AI constants
	let computerChoice;

	// Selecting the DOM elements
	let board = document.querySelector('.board');
	let cells = document.querySelectorAll('.cell');

	// Bind event listeners to the cells
	for(let cellIndex in cells) {
		if( cells.hasOwnProperty(cellIndex) ) {
			let currentCell = cells[cellIndex];

			currentCell.addEventListener('click', () => {
				if( !Board.gameOver() )
					makeHumanPlayerMove(cellIndex);
			});

			currentCell.addEventListener('mouseenter', () => {
				if( !Board.cellHasBeenPlayed(cellIndex) && !Board.gameOver() ) 
					highlightCellWithCurrentSymbol(cellIndex);

			});

			currentCell.addEventListener('mouseleave', () => {
				if( !Board.cellHasBeenPlayed(cellIndex) && !Board.gameOver() )
					removeHighlightAndSymbolFromCell(cellIndex);
			});

		}
	}

	// Utitity functions

	function makeHumanPlayerMove(cellIndex) {
		makeMove(cellIndex);
		if( !Board.gameOver() )
			makeComputerPlayerMove();
		else
			console.log('The game is over')
	}

	function makeComputerPlayerMove() {
		minimax(0); 
		makeMove(computerChoice);

		if( Board.gameOver() )
			console.log('The game is over');
	}

	// Checks for available moves on the board and then return a random cell that can be played
	function randomMove() {
		let availableMoves = Board.availableMoves();
		return availableMoves[Math.floor(Math.random() * availableMoves.length)];
	}

	function evaluatePosition(depth) {
		// if it's a tie
		if(Board.isTie()) {
			return 0;
		} else if (Board.winner === 1) {
			return depth - 10;
		} else if (Board.winner === 0) {
			return 10 - depth;
		} 
	}

		// The minimax algorithm 
	function minimax(depth) {
		if(Board.gameOver()) 
			return evaluatePosition(depth);

    depth++; // increase the depth
    var scores = [];
    var moves = [];


    var availableMoves = Board.availableMoves();

    for(var move of availableMoves) {
    	Board.makeMove(move);
    	scores.push(minimax(depth));
    	moves.push(move);
    	Board.retractMove(move);
    }

    var max_score, max_score_index, min_score,
            min_score_index;
    if (Board.currentPlayer() === 'Computer') {
      max_score = Math.max.apply(Math, scores);
      max_score_index = scores.indexOf(max_score);
      computerChoice = moves[max_score_index];
      return scores[max_score_index];

    } else {
      min_score = Math.min.apply(Math, scores);
      min_score_index = scores.indexOf(min_score);
      computerChoice = moves[min_score_index];
      return scores[min_score_index];
    }
	}

	// Makes the move on the board
	// also updates the UI to reflect the same 
	function makeMove(cellIndex) {
		addSymbolToCell(cellIndex, Board.makeMove(cellIndex));
		highlightCell(cellIndex);
	}

	// Retracts a move from the board
	// also updates UI to reflect the same.
	function retractMove(cellIndex) {
		Board.retractMove(cellIndex);
		removeHighlightAndSymbolFromCell(cellIndex);
	}


	// Given the index of the cell
	// Highlights it.
	function highlightCell(cellIndex) {
		cells[cellIndex].classList.add('played');
	}

	function addSymbolToCell(cellIndex, symbol) {
		cells[cellIndex].children[0].innerHTML = symbol;
	}

	function highlightCellWithCurrentSymbol(cellIndex) {
		highlightCell(cellIndex);
		addSymbolToCell(cellIndex, Board.symbolToBePlayed());
	}

	function removeHighlightAndSymbolFromCell(cellIndex) {
		removeHighlightFromCell(cellIndex);
		removeSymbolFromCell(cellIndex);
	}

	function removeHighlightFromCell(cellIndex) {
		cells[cellIndex].classList.remove('played');
	}

	function removeSymbolFromCell(cellIndex) {
		cells[cellIndex].children[0].innerHTML = '';
	}

	function drawBoard(currentState) {
		console.log(
			`${currentState[0] || ''} | ${currentState[1] || ''} | ${currentState[2] || ''} \n
			--------------------------------------------------------------
			 ${currentState[3] || ''} | ${currentState[4] || ''} | ${currentState[5] || ''} \n
			--------------------------------------------------------------
			 ${currentState[6] || ''} | ${currentState[7] || ''} | ${currentState[8] || ''}`
		);
	}

});