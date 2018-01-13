// mouse coordinates
var swipeStartX=0;
var swipeStartY=0;
var swipeStopX=0;
var swipeStopY=0;

// row and column corresponding to mouse coordinates
var swipeStartRow=0;
var swipeStartCol=0;
var swipeStopRow=0;
var swipeStopCol=0;

// square info
var firstX = 50;
var firstY = 50;
var squareSize = 50;
var distanceBetweenSquares = 10;

// colors
var colorOrder = ["red", "yellow", "green", "blue"];

// holds the references to all squares on the board
// needed for changing colors
var boardSquares = [];

// levels
var level1 = [
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [2,1,1,1]
];

var currentLevel = level1;