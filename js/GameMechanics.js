function TreadSquares(){
    // ignore if it's on the same square
    if(swipeStartRow === swipeStopRow && swipeStartCol === swipeStopCol){
        return;
    }

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
    for(var index = 1; index <= currentLevel[swipeStartRow - 1].length; index++){
        ColorSquareWithColor(swipeStartRow, index, true);
    }
}

function TreadRowPrev(){
    for(var index = 1; index <= currentLevel[swipeStartRow - 1].length; index++){
        ColorSquareWithColor(swipeStartRow, index, false);
    }
}

function TreadColFw(){
    for(var index = 1; index <= currentLevel.length; index++){
        ColorSquareWithColor(index, swipeStartCol, true);
    }
}

function TreadColPrev(){
    for(var index = 1; index <= currentLevel.length; index++){
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
    while(rowIndex <= currentLevel.length && colIndex <= currentLevel.length){
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
    while(rowIndex <= currentLevel.length && colIndex <= currentLevel.length){
        ColorSquareWithColor(rowIndex, colIndex, false);
        rowIndex++;
        colIndex++;
    }
}

function TreadSecondaryDiagFw(){
    // color upwards
    var rowIndex = swipeStartRow;
    var colIndex = swipeStartCol;
    while(rowIndex > 0 && colIndex <= currentLevel.length){
        ColorSquareWithColor(rowIndex, colIndex, true);
        rowIndex--;
        colIndex++;
    }

    // color downwards
    var rowIndex = swipeStartRow + 1;
    var colIndex = swipeStartCol - 1;
    while(rowIndex <= currentLevel.length && colIndex > 0){
        ColorSquareWithColor(rowIndex, colIndex, true);
        rowIndex++;
        colIndex--;
    }
}

function TreadSecondaryDiagPrev(){
    // color upwards
    var rowIndex = swipeStartRow;
    var colIndex = swipeStartCol;
    while(rowIndex > 0 && colIndex <= currentLevel.length){
        ColorSquareWithColor(rowIndex, colIndex, false);
        rowIndex--;
        colIndex++;
    }

    // color downwards
    var rowIndex = swipeStartRow + 1;
    var colIndex = swipeStartCol - 1;
    while(rowIndex <= currentLevel.length && colIndex > 0){
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