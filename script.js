const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 120;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{ x: head.x, y: head.y }];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        lives: 3,
        level: 1
    }
}
let snake1 = initSnake("purple");

// Soal no 4: make apples array
let apples = [{
            color: "red",
            position: initPosition(),
        },
        {
            color: "green",
            position: initPosition(),
        }
    ]
    //this
let live = {
    color: "blue",
    position: initPosition(),
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function gameOver(ctx) {
    ctx.font = "bold 30px Poppins";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Yah kalah, Semangat!! ", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
}

function drawLives(ctx, snake) {
    ctx.fillText(`${snake.lives}`, 40, 5);
    let img = document.getElementById("lives");
    ctx.drawImage(img, 0, 0, 30, 30);
}

function updateLevel(snake) {
    let requirementScore = 5;
    if ((snake.score >= 1) && snake.score % requirementScore == 0) {
        snake.level += 1;
    }
}

function drawLevel(ctx, snake) {
    ctx.fillText(`Level - ${snake.level}`, 440, 40);
}

function checkLives(ctx, snake) {
    if (snake.lives <= 0) {
        gameOver(ctx);
    }
}

// Soal no 6: Pada fungsi drawScore, tambahkan score3Board:
function drawScore(snake) {
    let canvas;
    if (snake.color == snake1.color) {
        canvas = document.getElementById("score1Board");
    }
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.font = "bold 30px Poppins";
    ctx.fillStyle = "Black";
    ctx.textBaseline = "top";

    let img = document.getElementById("apple");
    ctx.drawImage(img, 0, 35, 30, 30);
    ctx.fillText(`${snake.score}`, 40, 40);

    drawLives(ctx, snake);
    drawLevel(ctx, snake);
}

function draw() {
    setInterval(function() {
            let snakeCanvas = document.getElementById("snakeBoard");
            let ctx = snakeCanvas.getContext("2d");

            ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

            checkLives(ctx, snake1);
            if (snake1.lives <= 0) {
                drawScore(snake1);
                return;
            }
            var imgSnake = document.getElementById("snake");

            ctx.drawImage(imgSnake, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

            for (let i = 0; i < snake1.body.length; i++) {
                ctx.drawImage(imgSnake, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }


            for (let i = 0; i < apples.length; i++) {
                let apple = apples[i];

                // Soal no 3: DrawImage apple dan gunakan image id:
                var img = document.getElementById("apple");
                ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

            }

            //this
            if (isPrime(snake1.score)) {

                var img = document.getElementById("lives");
                ctx.drawImage(img, live.position.x * CELL_SIZE, live.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }


            switch (snake1.level) {

                case 2:
                    for (let j = 7; j < 22; j++) {
                        var x = 10;
                        drawCell(ctx, 14, j, "red");
                    }

                    break;


                case 3:
                    for (let j = 4; j < 18; j++) {
                        var x = 10;
                        drawCell(ctx, j, 6, "red");
                    }

                    for (let j = 12; j < 26; j++) {
                        var x = 10;
                        drawCell(ctx, j, 20, "red");
                    }
                    break;
                case 4:
                    for (let j = 10; j < 20; j++) {
                        drawCell(ctx, j, 6, "red");
                    }

                    for (let j = 4; j < 11; j++) {
                        drawCell(ctx, j, 15, "red");
                    }

                    for (let j = 19; j < 26; j++) {
                        drawCell(ctx, j, 15, "red");
                    }



                    for (let j = 10; j < 20; j++) {
                        drawCell(ctx, j, 24, "red");
                    }


                    break;

                case 5:
                    for (let j = 10; j < 20; j++) {
                        drawCell(ctx, j, 6, "red");
                    }

                    for (let j = 0; j < 11; j++) {
                        drawCell(ctx, j, 15, "red");
                    }

                    for (let j = 19; j < 40; j++) {
                        drawCell(ctx, j, 15, "red");
                    }



                    for (let j = 10; j < 20; j++) {
                        drawCell(ctx, j, 24, "red");
                    }


                    break;

                case 6:
                    alert("Game finished")
            }
            drawScore(snake1);

        },
        REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

// Soal no 4: Jadikan apples array
function eat(snake, apples) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;
            updateLevel(snake)
            snake.body.push({ x: snake.head.x, y: snake.head.y });
        }
    }
}

//this
function eatlive(snake, live) {
    if (snake.head.x == live.position.x && snake.head.y == live.position.y) {
        live.position = initPosition();
        snake.lives++;
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples);
    eatlive(snake, live);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples);
    eatlive(snake, live);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples);
    eatlive(snake, live);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples);
    eatlive(snake, live);
}

function removeBodySnake(snake) {
    snake.lives--;
    while (snake.body.length) {
        snake.body.pop();
    }
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
                for (let j = 7; j < 22; j++) {
                    if (snakes[i].head.x == 14 && snakes[i].head.y == j && snakes[i].level == 2) {
                        isCollide = true;
                    }
                }

                for (let l = 4; l < 18; l++) {
                    if (snakes[i].head.x == l && snakes[i].head.y == 6 && snakes[i].level == 3) {
                        isCollide = true;
                    }
                }
                for (let j = 12; j < 26; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 20 && snakes[i].level == 3) {
                        isCollide = true;
                    }
                }
                for (let j = 10; j < 20; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 6 && snakes[i].level == 4) {
                        isCollide = true;
                    }
                }

                for (let j = 4; j < 11; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 15 && snakes[i].level == 4) {
                        isCollide = true;
                    }
                }

                for (let j = 19; j < 26; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 15 && snakes[i].level == 4) {
                        isCollide = true;
                    }
                }

                for (let j = 10; j < 20; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 24 && snakes[i].level == 4) {
                        isCollide = true;
                    }
                }
                for (let j = 10; j < 20; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 6 && snakes[i].level == 5) {
                        isCollide = true;
                    }
                }

                for (let j = 0; j < 11; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 15 && snakes[i].level == 5) {
                        isCollide = true;
                    }
                }

                for (let j = 19; j < 40; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 15 && snakes[i].level == 5) {
                        isCollide = true;
                    }
                }

                for (let j = 10; j < 20; j++) {
                    if (snakes[i].head.x == j && snakes[i].head.y == 24 && snakes[i].level == 5) {
                        isCollide = true;
                    }
                }




            }

        }
    }
    if (isCollide) {
        removeBodySnake(snake1);
        var audio = new Audio('Asset/game-over.mp3');
        audio.play();
    }
    return isCollide;
}


function isPrime(n) {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
    var m = Math.sqrt(n); //returns the square root of the passed value
    for (var i = 2; i <= m; i++)
        if (n % i == 0) return false;
    return true;

}


function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }

})

document.addEventListener(snake1.level == 2, function() {
    var audio = new Audio('Asset/game-over.mp3');
    audio.play();

}, { once: true });

function initGame() {
    move(snake1);

}

initGame();