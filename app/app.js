document.addEventListener("DOMContentLoaded", function(event) { 

	let Board = require('./Board');

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
					makeMove(cellIndex);
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