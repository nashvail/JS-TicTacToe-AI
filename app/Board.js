
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
	currentState: [],
	// Number of cells in the board, traditionally there are 9 cells on the board, don't try to muck around with that ya know.
	numCells: 9, 
	// The current symbol being played is either 1('x') or 0('o') and toggles on every turn 
	// We will start with 'x' as the first symbol being played 
	currentSymbolBeingPlayed: 1,
	winningCombinations: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
	// Each move takes in the cellIndex at which the move is to be made 
	// the symbol to be put in that cell is taken care of by the currentSymbolBeingPlayed
	// a) cellIndex -> The index of the cell at which the move is to be made 
	makeMove(cellIndex) {
		// First we will have to check if the cell is empty or not 
		if(!this.cellHasBeenPlayed(cellIndex)) 
			this.currentState[cellIndex] = ['o', 'x'][this.currentSymbolBeingPlayed];
		else
			console.log('The cell already has a value and cannot be reset');

		this.toggleCurrentSymbolBeingPlayed();
	},

	// Given an index of a cell on the board 
	// checks if the cell has been played or not 
	// returns true if yes false otherwise
	cellHasBeenPlayed(cellIndex){
		return (!!this.currentState[cellIndex]);
	},

	allCellsHaveBeenPlayed() {
		// Now here there could be two things that I am thinking of 
		// the first thing is that if the currentState array has a length equal to numCells 
		// or the next thing I could go through each one of the states and check if I went through numCells number of cells
		// and that each one of the cell holds a value 	
		// For now let us stick with the simpler version if we run into something we are going to change it alright ? 
		return (this.currentState.length === this.numCells);
	},

	hasWinningCombination() {
		for( var i = 0 ; i < this.winningCombinations.length; i++ ) {
			let combination = this.winningCombinations[i];
			let symbolsArray = combination.map((cellIndex) => this.currentState[cellIndex]);
			if( symbolsArray.hasIdenticalValues() ) return true;
		}
		return false;
	},

	gameOver() {
		return this.hasWinningCombination() || this.allCellsHaveBeenPlayed();
	},

	toggleCurrentSymbolBeingPlayed() {
		this.currentSymbolBeingPlayed = Number(!this.currentSymbolBeingPlayed);
	}

};