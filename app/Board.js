// Represents the Tic Tac Toe Board

module.exports = {

	// At any given point of time, the board has a state 
	// Iniitally the state of the board is empty, this implies none of the cells of the board has yet been played
	// as we start playing the game the state of the board updates, and so updates the array below to reflect the 
	// state of the board.
	// e.g. On playing 'X' on the cell with index of 2, the currentState holds the following configuration
	// currentState[2: 'X']
	// When a cell has not been played it holds undefined to represent the same.
	currentState: [],

	// Number of cells in the board, traditionally there are 9 cells on the board, don't try to muck around with that ya know.
	numCells: 9,

	// The current symbol being played is either 1('X') or 0('O') and toggles on every turn 
	// We will start with 'X' as the first symbol being played 
	currentSymbolBeingPlayed: 1,

	// Think of the board with 9 cells as a 3x3 matrix, the following array holds the indicies in which if 
	// the symbols are same the game is over with a winner
	winningCombinations: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],

	// Each move takes in the cellIndex at which the move is to be made 
	// the symbol to be put in that cell is taken care of by the currentSymbolBeingPlayed
	// a) cellIndex -> The index of the cell at which the move is to be made 
	makeMove(cellIndex) {

		let symbolToBePlayed = ['O', 'X'][this.currentSymbolBeingPlayed];
		
		if(!this.cellHasBeenPlayed(cellIndex)) { // IF the cell has not been played yet 
			this.currentState[cellIndex] = symbolToBePlayed;
		} else {
			return this.currentState[cellIndex];
		}

		// Checks if the move results in game over 
		if(this.isGameOver()) console.log('Game over');
		this.toggleCurrentSymbolBeingPlayed();
		return symbolToBePlayed;
	},

	// Retracts the move, i.e. removes the 
	// symbol played at cellIndex in the currentState array
	retractMove(cellIndex) {
		delete this.currentState[cellIndex];
	},

	// Given an index of a cell on the board 
	// checks if the cell has been played or not 
	// returns true if yes false otherwise.
	cellHasBeenPlayed(cellIndex){
		return (!!this.currentState[cellIndex]);
	},

	// Returns true if all the cells in the board has been played 
	allCellsHaveBeenPlayed() {
		return (this.currentState.filter((val) => val !== undefined).length === this.numCells);
	},

	// Checks if the board currently has a winning combination
	hasWinningCombination() {
		for( var i = 0 ; i < this.winningCombinations.length; i++ ) {
			let combination = this.winningCombinations[i];
			let symbolsArray = combination.map((cellIndex) => this.currentState[cellIndex]);
			if( symbolsArray.hasIdenticalValues() ) return true;
		}
		return false;
	},

	// Game over is declared either when there is a winning combination on the board
	// or all the cells on the board have been played.
	isGameOver() {
		return this.hasWinningCombination() || this.allCellsHaveBeenPlayed();
	},

	// Since after each move on the board the symbol that is being played switches
	// between 'O' and 'X', this function takes care of doing that.
	toggleCurrentSymbolBeingPlayed() {
		this.currentSymbolBeingPlayed = Number(!this.currentSymbolBeingPlayed);
	},

	// Returns the symbol that will be played when the next move will be made.
	symbolToBePlayed() {
		return ['O', 'X'][this.currentSymbolBeingPlayed];
	}

};