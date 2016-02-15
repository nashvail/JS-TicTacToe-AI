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
		let symbolToBePlayed = ['O', 'X'][this.currentSymbolBeingPlayed];
		
		if(!this.cellHasBeenPlayed(cellIndex)) {
			this.currentState[cellIndex] = symbolToBePlayed;
		} else {
			return this.currentState[cellIndex];
		}

		if(this.isGameOver()) console.log('Game over');
		this.toggleCurrentSymbolBeingPlayed();
		return symbolToBePlayed;
	},

	retractMove(cellIndex) {
		delete this.currentState[cellIndex];
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
		// Now there this javascript quirk pops its head up see if you directly went ahead and clicked on the last cell
		// or played the last cell in other words the length of the currentState will become 9 since you know JS. And that is 
		// a bug and we need to get rid of that. So we'll be getting rid of the code below alright?
		return (this.currentState.filter((val) => val !== undefined).length === this.numCells);
	},

	hasWinningCombination() {
		for( var i = 0 ; i < this.winningCombinations.length; i++ ) {
			let combination = this.winningCombinations[i];
			let symbolsArray = combination.map((cellIndex) => this.currentState[cellIndex]);
			if( symbolsArray.hasIdenticalValues() ) return true;
		}
		return false;
	},

	isGameOver() {
		return this.hasWinningCombination() || this.allCellsHaveBeenPlayed();
	},

	toggleCurrentSymbolBeingPlayed() {
		this.currentSymbolBeingPlayed = Number(!this.currentSymbolBeingPlayed);
	},

	symbolToBePlayed() {
		return ['O', 'X'][this.currentSymbolBeingPlayed];
	}

};