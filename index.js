var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});
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

for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0XFFEC8B, 1);
        graphics.drawRect(app.renderer.width / 8 + j * 73, app.renderer.height / 8 * 3 + i * 73, 70, 70);
        app.stage.addChild(graphics);
    }
}

function generateNumberRandom() {
    return Math.floor(Math.random() * 4);
}

function drawCell(rowIndex, columnIndex) {
    var color = 0XFFEC8B;

    if (grid[rowIndex][columnIndex] == 2) {
        color = 0xFFC125;
    }

    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 1);
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

var rowIndex = generateNumberRandom();
var columnIndex = generateNumberRandom();

grid[rowIndex][columnIndex] = 2;
drawCell(rowIndex, columnIndex);

document.addEventListener('keydown', function (event) {
    if (event.code === 'ArrowRight') {
        console.log(event);
   }
});


