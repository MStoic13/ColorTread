// create the stage
var stage = new Konva.Stage({
    container: 'GameAreaContainerId',   // id of container <div>
    width: 900,
    height: 900
});

DrawBoardFromLevel(stage, currentLevel);