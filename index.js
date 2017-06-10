var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xB0C4DE});
document.body.appendChild(app.view);

var basicText = new PIXI.Text('2048', {
    fontSize: 95,
    fill: 'white'
});
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 4;

app.stage.addChild(basicText);

var grid = [];
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0];
}
var flushUI = function () {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawCell(i, j);
        }
    }
};
flushUI();

function generateNumberRandom() {
    return Math.floor(Math.random() * 4);
}

function drawCell(rowIndex, columnIndex) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[rowIndex][columnIndex]), 1);
    graphics.drawRect(app.renderer.width / 8 + columnIndex * 73, app.renderer.height / 8 * 3 + rowIndex * 73, 70, 70);
    app.stage.addChild(graphics);

    if (grid[rowIndex][columnIndex] != 0) {
        var number = new PIXI.Text(grid[rowIndex][columnIndex], {
            fontSize: 60,
            fill: 'white'
        });
        number.anchor.set(0.5);
        number.x = 35 + app.renderer.width / 8 + columnIndex * 73;
        number.y = 35 + app.renderer.height / 8 * 3 + rowIndex * 73;
        app.stage.addChild(number);
    }
}
function getColorByNumber(number) {
    var colorValue = {
        0: 0x8B8682,
        2: 0xCCCCCC,
        4: 0xCCCCCC,
        8: 0xEEDC82,
        16: 0xEEDC82,
        32: 0xF4A460,
        64: 0xEE7942
    };
    return colorValue[number];
}
for (var k = 0; k < 5; k++) {
    var rowIndex = generateNumberRandom();
    var columnIndex = generateNumberRandom();

    grid[rowIndex][columnIndex] = 2;
    drawCell(rowIndex, columnIndex);
    document.addEventListener('keydown', function (event) {
        if (event.code === 'ArrowRight') {
            moveCellToRight();
            flushUI();
        }
    });
}


function moveCellToRight() {
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;

            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex + 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;
            }

        }
    }
}
function findTheFirstRightCell(rowIndex, columnIndex) {
    for (let i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }
    return -1;
}
