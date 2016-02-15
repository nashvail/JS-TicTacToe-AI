document.addEventListener("DOMContentLoaded", function(event) { 
	window.retractMove = retractMove;
	// You can simply begin writing javascript and webpack has all the backdoors covered for you no need to worry 
	// about anything 
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

	// Bind click listener to each of the cells
	for(let cellIndex in cells) {
		if( cells.hasOwnProperty(cellIndex) ) {
			let currentCell = cells[cellIndex];

			currentCell.addEventListener('click', () => {
				if( !Board.isGameOver() )
					makeMove(cellIndex);
			});

			currentCell.addEventListener('mouseenter', () => {
				if( !Board.cellHasBeenPlayed(cellIndex) && !Board.isGameOver() ) 
					highlightCellWithCurrentSymbol(cellIndex);

			});

			currentCell.addEventListener('mouseleave', () => {
				if( !Board.cellHasBeenPlayed(cellIndex) && !Board.isGameOver() )
					removeHighlightAndSymbolFromCell(cellIndex);
			});

		}
	}

	// Utitity functions
	/*
	* Updates the state of the board as well as the UI to match the state of the board.
	*/
	function makeMove(cellIndex) {
		// Make the move on the board
		addSymbolToCell(cellIndex, Board.makeMove(cellIndex));
		highlightCell(cellIndex);
	}

	function retractMove(cellIndex) {
		Board.retractMove(cellIndex);
		removeHighlightAndSymbolFromCell(cellIndex);
	}


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