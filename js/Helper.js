function DrawBoard(stage){
    // create the layer
    var drawingLayer = new Konva.Layer();

    // add the mouse interaction listeners
    stage.on('mousedown', function() {
        var pointCoordinates = stage.getPointerPosition();
        console.log('mousedown on ' + JSON.stringify(IdentifySquare(pointCoordinates)));
        lineStartX = pointCoordinates.x;
        lineStartY = pointCoordinates.y;
    });
    stage.on('mouseup', function() {
        var pointCoordinates = stage.getPointerPosition();
        console.log('mouseup on ' + JSON.stringify(IdentifySquare(pointCoordinates)));
        lineStopX = pointCoordinates.x;
        lineStartY = pointCoordinates.y;
        //TreadSquares(); // change the colors on the row / col / diag
    });

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