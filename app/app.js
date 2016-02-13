// You can simply begin writing javascript and webpack has all the backdoors covered for you no need to worry 
// about anything 
let Board = require('./Board');

console.log(Board.currentState);
Board.makeMove(1);
console.log(Board.currentState);
Board.makeMove(3);
console.log(Board.currentState);

