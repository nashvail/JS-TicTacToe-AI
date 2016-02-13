
// Extending array prototype to check for identical values in an array
Array.prototype.hasIdenticalValues = function() {
	for( var i = 1; i < this.length; i++)
		if( this[0] !== this[i] || !this[i]) return false;
	return true;
};

// File exports a Board object
module.exports = {
	// The state of the board is defined like this 
	// a) Each cell in the board has a number starting from 0 to 8 
	// b) Each cell's state is represented by either  x, o at respective 
	// index in the following array, if an index has value of undefined that means it is not set
	// c) Initially all of the cells have 0 state => empty
	currentState : [],
	// Number of cells in the board, traditionally there are 9 cells on the board, don't try to muck around with that ya know.
	numCells: 9, 
	winningCombinations: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
	// Each move is represented by an object holding two keys
	// a) cellIndex -> The index of the cell at which the move is to be made 
	// b) symbol -> either 1 for 'x' or 0 for 'o'
	makeMove({cellIndex, symbol}) {
		// First we will have to check if the cell is empty or not 
		if(!this.cellHasBeenPlayed(cellIndex)) 
			this.currentState[cellIndex] = ['o', 'x'][symbol];
		else
			console.log('The cell already has a value and cannot be reset');
	},

	// Given an index of a cell on the board 
	// checks if the cell has been played or not 
	// returns true if yes false otherwise
	cellHasBeenPlayed(cellIndex){
		return (!!this.currentState[cellIndex]);
	},

	hasWinningCombination() {
		for( var i = 0 ; i < this.winningCombinations.length; i++ ) {
			let combination = this.winningCombinations[i];
			let symbolsArray = combination.map((cellIndex) => this.currentState[cellIndex]);
			if( symbolsArray.hasIdenticalValues() ) return true;
		}
		return false;
	}
};