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
		cells[cellIndex].addEventListener('click',() => {
			console.log(cells[cellIndex]);	
		});
	}
}
