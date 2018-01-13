function DrawBoard(stage){
    // create the layer
    var drawingLayer = new Konva.Layer();

    // add the mouse interaction listeners
    AddSwipeListenersToStage(stage);

    // create the squares
    // row 1
    var rect11 = new Konva.Rect({
    x: firstX,
    y: firstY,
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });
    
    var rect12 = new Konva.Rect({
    x: firstX + squareSize + distanceBetweenSquares,
    y: firstY,
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });
    
    var rect13 = new Konva.Rect({
    x: firstX + 2 * (squareSize + distanceBetweenSquares),
    y: firstY,
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });

    // row 2
    var rect21 = new Konva.Rect({
    x: firstX,
    y: firstY + squareSize + distanceBetweenSquares,
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });
    
    var rect22 = new Konva.Rect({
    x: firstX + squareSize + distanceBetweenSquares,
    y: firstY + squareSize + distanceBetweenSquares,
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });
    
    var rect23 = new Konva.Rect({
    x: firstX + 2 * (squareSize + distanceBetweenSquares),
    y: firstY + squareSize + distanceBetweenSquares,
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });
    
    // row 3
    var rect31 = new Konva.Rect({
    x: firstX,
    y: firstY + 2 * (squareSize + distanceBetweenSquares),
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });
    
    var rect32 = new Konva.Rect({
    x: firstX + squareSize + distanceBetweenSquares,
    y: firstY + 2 * (squareSize + distanceBetweenSquares),
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });
    
    var rect33 = new Konva.Rect({
    x: firstX + 2 * (squareSize + distanceBetweenSquares),
    y: firstY + 2 * (squareSize + distanceBetweenSquares),
    width: squareSize,
    height: squareSize,
    fill: 'green',
    stroke: 'black',
    strokeWidth: 4
    });


    // add the squares to the boardSquares
    // row 1
    boardSquares[1] = [];
    boardSquares[1][1] = rect11;
    boardSquares[1][2] = rect12;
    boardSquares[1][3] = rect13;
    boardSquares[2] = [];
    boardSquares[2][1] = rect21;
    boardSquares[2][2] = rect22;
    boardSquares[2][3] = rect23;
    boardSquares[3] = [];
    boardSquares[3][1] = rect31;
    boardSquares[3][2] = rect32;
    boardSquares[3][3] = rect33;

    // add the shapes to the layer
    // row 1
    drawingLayer.add(rect11);
    drawingLayer.add(rect12);
    drawingLayer.add(rect13);
    
    // row 2
    drawingLayer.add(rect21);
    drawingLayer.add(rect22);
    drawingLayer.add(rect23);

    // row 3
    drawingLayer.add(rect31);
    drawingLayer.add(rect32);
    drawingLayer.add(rect33);

    // add the layer to the stage
    stage.add(drawingLayer);
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