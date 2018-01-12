var lineStartX=0;
var lineStartY=0;
var lineStopX=0;
var lineStopY=0;

// first we need to create a stage
var stage = new Konva.Stage({
    container: 'GameAreaContainerId',   // id of container <div>
    width: 500,
    height: 500
});

// then create layer
var drawingLayer = new Konva.Layer();

stage.on('mousedown', function() {
    var pointCoordinates = stage.getPointerPosition();
    console.log('mousedown on ' + JSON.stringify(pointCoordinates));
    lineStartX = pointCoordinates.x;
    lineStartY = pointCoordinates.y;
});
stage.on('mouseup', function() {
    var pointCoordinates = stage.getPointerPosition();
    console.log('mouseup on ' + JSON.stringify(pointCoordinates));
    lineStopX = pointCoordinates.x;
    lineStartY = pointCoordinates.y;

    var redLine = new Konva.Line({
        x: lineStartX,
        y: lineStartY,
        points: [lineStopY, lineStopX],
        stroke: 'red',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
      });

      drawingLayer.add(redLine);
      redLine.draw();
});

// create our shape
var rect1 = new Konva.Rect({
x: 50,
y: 50,
width: 50,
height: 50,
fill: 'green',
stroke: 'black',
strokeWidth: 4
});

var rect2 = new Konva.Rect({
x: 110,
y: 50,
width: 50,
height: 50,
fill: 'green',
stroke: 'black',
strokeWidth: 4
});

var rect3 = new Konva.Rect({
x: 170,
y: 50,
width: 50,
height: 50,
fill: 'green',
stroke: 'black',
strokeWidth: 4
});

// add the shape to the layer
drawingLayer.add(rect1);
drawingLayer.add(rect2);
drawingLayer.add(rect3);

// add the layer to the stage
stage.add(drawingLayer);

