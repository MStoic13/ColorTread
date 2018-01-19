function DrawBoardFromLevel(stage, levelArray){
    // create the layer
    var drawingLayer = new Konva.Layer();
    
    // add the mouse interaction listeners
    AddSwipeListenersToStage(stage);

    // create squares according to level map
    for(var rowIndex = 0; rowIndex < levelArray.length; rowIndex++){
        boardSquares[rowIndex + 1] = [];
        for(var colIndex = 0; colIndex < levelArray[rowIndex].length; colIndex++){
            var rect = new Konva.Rect({
                x: firstX + colIndex * (squareSize + distanceBetweenSquares),
                y: firstY + rowIndex * (squareSize + distanceBetweenSquares),
                width: squareSize,
                height: squareSize,
                fill: colorOrder[levelArray[rowIndex][colIndex]],
                stroke: 'black',
                strokeWidth: 4
                });
            boardSquares[rowIndex + 1][colIndex + 1] = rect;
            drawingLayer.add(rect);
        }
    }

    stage.add(drawingLayer);
}

function AddSwipeListenersToStage(stage){
    stage.on('mousedown', function() {
        var pointCoordinates = stage.getPointerPosition();
        swipeStartX = pointCoordinates.x;
        swipeStartY = pointCoordinates.y;
        var squarePosition = IdentifySquare(pointCoordinates);
        swipeStartRow = squarePosition.row;
        swipeStartCol = squarePosition.column;
    });
    stage.on('mouseup', function() {
        var pointCoordinates = stage.getPointerPosition();
        swipeStopX = pointCoordinates.x;
        swipeStopY = pointCoordinates.y;
        var squarePosition = IdentifySquare(pointCoordinates);
        swipeStopRow = squarePosition.row;
        swipeStopCol = squarePosition.column;
        TreadSquares(); // change the colors on the row / col / diag
    });
}

// input: an object with an x and y fields
// output: an object with a row and column fields
// a row and column are guaranteed 
// because the mousedown and up won't trigger 
// unless it's on a square
function IdentifySquare(pointCoordinates){
    var row = 0;
    var column = 0;

    row = Math.ceil((pointCoordinates.y - firstX) / (squareSize + distanceBetweenSquares));
    column = Math.ceil((pointCoordinates.x - firstX) / (squareSize + distanceBetweenSquares));

    return {row: row, column: column};
}
