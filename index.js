var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0xB0C4DE});
document.body.appendChild(app.view);

var maxCount = 16;
var currentCount = 0;

var score = 0;
var basicText = new PIXI.Text('2048', {
    fontSize: 95,
    fill: 'white'
});
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 4;
app.stage.addChild(basicText);

var scoreText = new PIXI.Text('Score: ' + score, {
    fontSize: 48,
    fill:0xEEEE00
});
scoreText.anchor.set(0.5);
scoreText.x = app.renderer.width / 2;
scoreText.y = app.renderer.height / 10 * 9;
app.stage.addChild(scoreText);

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
    scoreText.text = 'Score: ' + score;
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
        64: 0xEE7942,
        128:0xDAA520,
        256:0xD2B48C,
        512:0xCD8162,
        1024:0xCDB7B5,
        2048:0xEE4000
    };
    return colorValue[number];
}

var addRandomCell = function () {
    if (currentCount === maxCount) return;

    var rowIndex = generateNumberRandom();
    var columnIndex = generateNumberRandom();

    while (grid[rowIndex][columnIndex] !== 0) {
        rowIndex = generateNumberRandom();
        columnIndex = generateNumberRandom();
    }
    grid[rowIndex][columnIndex] = 2;
    currentCount++;
};
addRandomCell();
addRandomCell();

flushUI();
var onToRightEventHandler = function () {
    var isChanged = moveCellToRight();
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.')
    }
};
var onToDownEventHandler = function () {
    rotateArray(3);
    var isChanged = moveCellToRight();
    rotateArray(1);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.')
    }
};
var onToLeftEventHandler = function () {
    rotateArray(2);
    var isChanged = moveCellToRight();
    rotateArray(2);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.')
    }
};
var onToUpEventHandler = function () {
    rotateArray(1);
    var isChanged = moveCellToRight();
    rotateArray(3);
    if (isChanged) {
        addRandomCell();
    }
    flushUI();
    if (checkGameOver()) {
        alert('Game over.')
    }
};
document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowRight') {
        // moveCellToRight();
        //addRandomCell();
        //flushUI();
        onToRightEventHandler();
    }
    if (event.code === 'ArrowUp') {
        // rotateArray(1);
        // moveCellToRight()
        //rotateArray(3);
        //addRandomCell();
        //flushUI();
        onToUpEventHandler()
    }
    if (event.code === 'ArrowLeft') {
        //rotateArray(2);
        //moveCellToRight()
        //rotateArray(2);
        //addRandomCell();
        // flushUI();
        onToLeftEventHandler();
    }
    if (event.code === 'ArrowDown') {
        // rotateArray(3);
        //moveCellToRight()
        // rotateArray(1);
        //addRandomCell();
        //flushUI();
        onToDownEventHandler();
    }
});
var hammertime = new Hammer.Manager(document, {
    recognizers: [
        [Hammer.Swipe, {direction: Hammer.DIRECTION_ALL}]
    ]
});
hammertime.on('swiperight', function () {
    onToRightEventHandler();
});
hammertime.on('swipeup', function () {
    onToUpEventHandler();
});
hammertime.on('swipeleft', function () {
    onToLeftEventHandler();
});
hammertime.on('swipedown', function () {
    onToDownEventHandler();
});

function moveCellToRight() {
    var isChanged = false;
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;
                isChanged=true;
            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;

            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex + 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;

                score += grid[rowIndex][currentIndex + 1];

                isChanged = true;

                currentCount--;
            }

        }
    }
    return isChanged;
}
function findTheFirstRightCell(rowIndex, columnIndex) {
    for (let i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }
    return -1;
}

function rotateArray(rotateCount = 1) {
    for (var i = 0; i < rotateCount; i++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map(function (row, rowIndex) {
            return row.map(function (item, columnIndex) {
                return array[3 - columnIndex][rowIndex];
            })
        })
    }
}

function checkGameOver() {
    if (currentCount !== maxCount) return false;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] === grid[i][j - 1] ||
                grid[i][j] === grid[i][j + 1] ||
                (grid[i - 1] && grid[i][j] === grid[i - 1][j]) ||
                (grid[i + 1] && grid[i][j] === grid[i + 1][j])
            ) {
                return false;
            }
        }
    }

    return true;
}