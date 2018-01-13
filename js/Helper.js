function DrawBoard(stage){
    // create the layer
    var drawingLayer = new Konva.Layer();

    // add the mouse interaction listeners
    stage.on('mousedown', function() {
        var pointCoordinates = stage.getPointerPosition();
        swipeStartX = pointCoordinates.x;
        swipeStartY = pointCoordinates.y;
        var squarePosition = IdentifySquare(pointCoordinates);
        console.log('mousedown on ' + JSON.stringify(squarePosition));
        swipeStartRow = squarePosition.row;
        swipeStartCol = squarePosition.column;
    });
    stage.on('mouseup', function() {
        var pointCoordinates = stage.getPointerPosition();
        swipeStopX = pointCoordinates.x;
        swipeStopY = pointCoordinates.y;
        var squarePosition = IdentifySquare(pointCoordinates);
        console.log('mouseup on ' + JSON.stringify(squarePosition));
        swipeStopRow = squarePosition.row;
        swipeStopCol = squarePosition.column;
        TreadSquares(); // change the colors on the row / col / diag
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

    //console.log("row=" + row + ", col=" + column);
    return {row: row, column: column};
}

function TreadSquares(){
    // ignore if it's on the same square
    if(swipeStartRow === swipeStopRow && swipeStartCol === swipeStopCol){
        return;
    }

    console.log("position: " + swipeStartRow + "," + swipeStartCol + "," + swipeStopRow + "," + swipeStopCol);
    // row logic
    if(swipeStartRow === swipeStopRow){
        if(swipeStartCol < swipeStopCol){
            TreadRowFw();
        }
        else{
            TreadRowPrev();
        }
    }
    // col logic
    else if(swipeStartCol === swipeStopCol){
        if(swipeStartRow < swipeStopRow){
            TreadColFw();
        }
        else{
            TreadColPrev();
        }
    }
    // diag logic
    else{
        var deltaX = swipeStartX - swipeStopX;
        var deltaY = swipeStartY - swipeStopY;
        var angle = Math.ceil(Math.atan2(deltaY, deltaX));

        console.log("angle=" + angle);

        // primary diag fw
        if(angle === -2){
            TreadPrimaryDiagFw();
        }
        // primary diag prev
        else if(angle === 1){
            TreadPrimaryDiagPrev();
        }
        // secondary diag fw
        else if(angle === 0){
            TreadSecondaryDiagFw();
        }
        // secondary diag prev
        else if(angle === 3){
            TreadSecondaryDiagPrev();
        }
    }
}

function TreadRowFw(){
    for(var index = 1; index <= 3; index++){
        ColorSquareWithColor(swipeStartRow, index, true);
    }
}

function TreadRowPrev(){
    for(var index = 1; index <= 3; index++){
        ColorSquareWithColor(swipeStartRow, index, false);
    }
}

function TreadColFw(){
    for(var index = 1; index <= 3; index++){
        ColorSquareWithColor(index, swipeStartCol, true);
    }
}

function TreadColPrev(){
    for(var index = 1; index <= 3; index++){
        ColorSquareWithColor(index, swipeStartCol, false);
    }
}

function TreadPrimaryDiagFw(){
    // color upwards
    var rowIndex = swipeStartRow;
    var colIndex = swipeStartCol;
    while(rowIndex > 0 && colIndex > 0){
        ColorSquareWithColor(rowIndex, colIndex, true);
        rowIndex--;
        colIndex--;
    }

    // color downwards
    var rowIndex = swipeStartRow + 1;
    var colIndex = swipeStartCol + 1;
    while(rowIndex < 4 && colIndex < 4){
        ColorSquareWithColor(rowIndex, colIndex, true);
        rowIndex++;
        colIndex++;
    }
}

function TreadPrimaryDiagPrev(){
    // color upwards
    var rowIndex = swipeStartRow;
    var colIndex = swipeStartCol;
    while(rowIndex > 0 && colIndex > 0){
        ColorSquareWithColor(rowIndex, colIndex, false);
        rowIndex--;
        colIndex--;
    }

    // color downwards
    var rowIndex = swipeStartRow + 1;
    var colIndex = swipeStartCol + 1;
    while(rowIndex < 4 && colIndex < 4){
        ColorSquareWithColor(rowIndex, colIndex, false);
        rowIndex++;
        colIndex++;
    }
}

function TreadSecondaryDiagFw(){
    // color upwards
    var rowIndex = swipeStartRow;
    var colIndex = swipeStartCol;
    while(rowIndex > 0 && colIndex < 4){
        ColorSquareWithColor(rowIndex, colIndex, true);
        rowIndex--;
        colIndex++;
    }

    // color downwards
    var rowIndex = swipeStartRow + 1;
    var colIndex = swipeStartCol - 1;
    while(rowIndex < 4 && colIndex > 0){
        ColorSquareWithColor(rowIndex, colIndex, true);
        rowIndex++;
        colIndex--;
    }
}

function TreadSecondaryDiagPrev(){
    // color upwards
    var rowIndex = swipeStartRow;
    var colIndex = swipeStartCol;
    while(rowIndex > 0 && colIndex < 4){
        ColorSquareWithColor(rowIndex, colIndex, false);
        rowIndex--;
        colIndex++;
    }

    // color downwards
    var rowIndex = swipeStartRow + 1;
    var colIndex = swipeStartCol - 1;
    while(rowIndex < 4 && colIndex > 0){
        ColorSquareWithColor(rowIndex, colIndex, false);
        rowIndex++;
        colIndex--;
    }
}

function ColorSquareWithColor(row, col, next){
    var currentColor = boardSquares[row][col].fill()
    var currentColorIndex = colorOrder.indexOf(currentColor);
    
    // loop colors when you reach the end
    var nextColorIndex;
    if(next){
        nextColorIndex = currentColorIndex === colorOrder.length - 1 ? 0 : currentColorIndex + 1;
    }
    else{
        nextColorIndex = currentColorIndex === 0 ? colorOrder.length - 1 : currentColorIndex - 1;
    }
    boardSquares[row][col].fill(colorOrder[nextColorIndex]);
    boardSquares[row][col].draw();
}

function LogPosition(){
    console.log("position: " + swipeStartRow + "," + swipeStartCol + "," + swipeStopRow + "," + swipeStopCol);
}