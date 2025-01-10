
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let snake = {
    x: 200,
    y: 200,
    dx: 10,
    dy: 0,
    cells: [],
    maxCells: 4
};

let food = {
    x: 0,
    y: 0
};

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width - 10) / 10) * 10;
    food.y = Math.floor(Math.random() * (canvas.height - 10) / 10) * 10;
}

function loop() {
    requestAnimationFrame(loop);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.cells.forEach((cell, index) => {
        ctx.fillStyle = 'green';
        ctx.fillRect(cell.x, cell.y, 10, 10);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0 || snake.x > canvas.width - 10 || snake.y < 0 || snake.y > canvas.height - 10) {
        alert('Game over!');
        return;
    }

    if (snake.x === food.x && snake.y === food.y) {
        snake.maxCells++;
        generateFood();
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}

loop();

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && snake.dy !== 10) {
        snake.dx = 0;
        snake.dy = -10;
    } else if (event.key === 'ArrowDown' && snake.dy !== -10) {
        snake.dx = 0;
        snake.dy = 10;
    } else if (event.key === 'ArrowLeft' && snake.dx !== 10) {
        snake.dx = -10;
        snake.dy = 0;
    } else if (event.key === 'ArrowRight' && snake.dx !== -10) {
        snake.dx = 10;
        snake.dy = 0;
    }
});