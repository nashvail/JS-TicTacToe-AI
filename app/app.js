document.addEventListener("DOMContentLoaded", function(event) { 

	let Board = require('./Board');
	let _ = require('lodash');

	// Extending array prototype to check for identical values in an array
	Array.prototype.hasIdenticalValues = function() {
		for( var i = 1; i < this.length; i++)
			if( this[0] !== this[i] || !this[i]) return false;
		return true;
	};

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

	// We will have to find a way to switch between user move and waiting for the computer to make a move

	// Utitity functions

	// When a click is registered on a cell this means that a human has made the move
	// because a computer can't fucking click, you know what I mean here right ? 
	function makeHumanPlayerMove(cellIndex) {
		// Make the move on the board 
		makeMove(cellIndex);

		// Now that the human has made the move we will make the computer make the move 
		// only if the game is not over yet 
		if( !Board.gameOver() )
			makeComputerPlayerMove(cellIndex);
		else
			console.log('The game is over')
	}

	function makeComputerPlayerMove(cellIndex) {

		// Let us first grab all the available moves that the computer has 
		let availableMoves = _.range(Board.numCells).map((currentIndex) => (!Board.cellHasBeenPlayed(currentIndex) ? currentIndex : [][0]))
			.filter((val) => val !== undefined);

		// Let us make the computer pick a random value from the array 
		let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
		makeMove(randomMove);

		// In the end we will check if the game is over and then do the rest 
		// Once the computer has made the move we will take care of that here 
		if( Board.gameOver() )
			console.log('The game is over');

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

});