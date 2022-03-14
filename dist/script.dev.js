"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CELL_SIZE = 20;
var CANVAS_SIZE = 600;
var REDRAW_INTERVAL = 50;
var WIDTH = CANVAS_SIZE / CELL_SIZE;
var HEIGHT = CANVAS_SIZE / CELL_SIZE;
var DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3
};
MOVE_INTERVAL = 120;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT)
  };
}

function initHeadAndBody() {
  var head = initPosition();
  var body = [{
    x: head.x,
    y: head.y
  }];
  return {
    head: head,
    body: body
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color) {
  return _objectSpread({
    color: color
  }, initHeadAndBody(), {
    direction: initDirection(),
    score: 0,
    lives: 3,
    level: 1,
    iscomplete: false
  });
}

var snake1 = initSnake("purple"); // Soal no 4: make apples array

var apples = [{
  color: "red",
  position: initPosition()
}, {
  color: "green",
  position: initPosition()
}]; //this

var live = {
  color: "blue",
  position: initPosition()
};
var sounds = {
  nextLevel: "Asset/game-new-level.mp3",
  gameOver: "Asset/game-over.mp3"
};

function playSound(sound) {
  var audio = new Audio(sound);
  audio.play();
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
  ctx.fillText("".concat(snake.lives), 40, 5);
  var img = document.getElementById("lives");
  ctx.drawImage(img, 0, 0, 30, 30);
}

function removeNotifLevel(ctx) {
  setTimeout(function () {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, 4000);
}

function drawNotifLevel(snake) {
  setTimeout(function () {
    var canvas = document.getElementById("notif");
    var ctx = canvas.getContext("2d");
    ctx.font = "bold 30px Poppins";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (snake.level > 5) {
      ctx.fillText("Hebat!!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
      return;
    }

    ;
    ctx.fillText("Selamat!! Level ".concat(snake.level - 1, " sudah selesai"), CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    removeNotifLevel(ctx);
  }, 1000);
}

function updateLevel(snake) {
  var requirementScore = 5;

  if (snake.score >= 1 && snake.score % requirementScore == 0) {
    snake.level += 1;
    drawNotifLevel(snake);
    playSound(sounds.nextLevel);
  }
}

function drawLevel(ctx, snake) {
  ctx.fillText("Level - ".concat(snake.level), 440, 40);
}

function checkLives(ctx, snake) {
  if (snake.lives <= 0) {
    gameOver(ctx);
  }
} // Soal no 6: Pada fungsi drawScore, tambahkan score3Board:


function drawScore(snake) {
  var canvas;

  if (snake.color == snake1.color) {
    canvas = document.getElementById("score1Board");
  }

  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.font = "bold 30px Poppins";
  ctx.fillStyle = "Black";
  ctx.textBaseline = "top";
  var img = document.getElementById("apple");
  ctx.drawImage(img, 0, 35, 30, 30);
  ctx.fillText("".concat(snake.score), 40, 40);
  drawLives(ctx, snake);
  drawLevel(ctx, snake);
}

function draw() {
  setInterval(function () {
    var snakeCanvas = document.getElementById("snakeBoard");
    var ctx = snakeCanvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    checkLives(ctx, snake1);

    if (snake1.lives <= 0) {
      drawScore(snake1);
      return;
    }

    if (snake1.iscomplete) {
      return;
    }

    var imgSnake = document.getElementById("snake");
    ctx.drawImage(imgSnake, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    for (var i = 0; i < snake1.body.length; i++) {
      ctx.drawImage(imgSnake, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    for (var _i = 0; _i < apples.length; _i++) {
      var apple = apples[_i]; // Soal no 3: DrawImage apple dan gunakan image id:

      var img = document.getElementById("apple");
      ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    } //this


    if (isPrime(snake1.score)) {
      var img = document.getElementById("lives");
      ctx.drawImage(img, live.position.x * CELL_SIZE, live.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    switch (snake1.level) {
      case 2:
        MOVE_INTERVAL = 110;

        for (var j = 7; j < 22; j++) {
          var x = 10;
          drawCell(ctx, 14, j, "red");
        }

        break;

      case 3:
        MOVE_INTERVAL = 100;

        for (var _j = 4; _j < 18; _j++) {
          var x = 10;
          drawCell(ctx, _j, 6, "red");
        }

        for (var _j2 = 12; _j2 < 26; _j2++) {
          var x = 10;
          drawCell(ctx, _j2, 20, "red");
        }

        break;

      case 4:
        MOVE_INTERVAL = 90;

        for (var _j3 = 10; _j3 < 20; _j3++) {
          drawCell(ctx, _j3, 6, "red");
        }

        for (var _j4 = 4; _j4 < 11; _j4++) {
          drawCell(ctx, _j4, 15, "red");
        }

        for (var _j5 = 19; _j5 < 26; _j5++) {
          drawCell(ctx, _j5, 15, "red");
        }

        for (var _j6 = 10; _j6 < 20; _j6++) {
          drawCell(ctx, _j6, 24, "red");
        }

        break;

      case 5:
        MOVE_INTERVAL = 80;

        for (var _j7 = 10; _j7 < 20; _j7++) {
          drawCell(ctx, _j7, 6, "red");
        }

        for (var _j8 = 0; _j8 < 11; _j8++) {
          drawCell(ctx, _j8, 15, "red");
        }

        for (var _j9 = 19; _j9 < 40; _j9++) {
          drawCell(ctx, _j9, 15, "red");
        }

        for (var _j10 = 10; _j10 < 20; _j10++) {
          drawCell(ctx, _j10, 24, "red");
        }

        break;

      case 6:
        drawNotifLevel(snake1);
        snake1.iscomplete = true;
    }

    drawScore(snake1);
  }, REDRAW_INTERVAL);
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
} // Soal no 4: Jadikan apples array


function eat(snake, apples) {
  for (var i = 0; i < apples.length; i++) {
    var apple = apples[i];

    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
      apple.position = initPosition();
      snake.score++;
      updateLevel(snake);
      snake.body.push({
        x: snake.head.x,
        y: snake.head.y
      });
    }
  }
} //this


function eatlive(snake, live) {
  if (snake.head.x == live.position.x && snake.head.y == live.position.y) {
    live.position = initPosition();

    if (snake.lives >= 3) {
      return;
    }

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
  var isCollide = false; //this

  for (var i = 0; i < snakes.length; i++) {
    for (var j = 0; j < snakes.length; j++) {
      for (var k = 1; k < snakes[j].body.length; k++) {
        if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
          isCollide = true;
        }

        for (var _j11 = 7; _j11 < 22; _j11++) {
          if (snakes[i].head.x == 14 && snakes[i].head.y == _j11 && snakes[i].level == 2) {
            isCollide = true;
          }
        }

        for (var l = 4; l < 18; l++) {
          if (snakes[i].head.x == l && snakes[i].head.y == 6 && snakes[i].level == 3) {
            isCollide = true;
          }
        }

        for (var _j12 = 12; _j12 < 26; _j12++) {
          if (snakes[i].head.x == _j12 && snakes[i].head.y == 20 && snakes[i].level == 3) {
            isCollide = true;
          }
        }

        for (var _j13 = 10; _j13 < 20; _j13++) {
          if (snakes[i].head.x == _j13 && snakes[i].head.y == 6 && snakes[i].level == 4) {
            isCollide = true;
          }
        }

        for (var _j14 = 4; _j14 < 11; _j14++) {
          if (snakes[i].head.x == _j14 && snakes[i].head.y == 15 && snakes[i].level == 4) {
            isCollide = true;
          }
        }

        for (var _j15 = 19; _j15 < 26; _j15++) {
          if (snakes[i].head.x == _j15 && snakes[i].head.y == 15 && snakes[i].level == 4) {
            isCollide = true;
          }
        }

        for (var _j16 = 10; _j16 < 20; _j16++) {
          if (snakes[i].head.x == _j16 && snakes[i].head.y == 24 && snakes[i].level == 4) {
            isCollide = true;
          }
        }

        for (var _j17 = 10; _j17 < 20; _j17++) {
          if (snakes[i].head.x == _j17 && snakes[i].head.y == 6 && snakes[i].level == 5) {
            isCollide = true;
          }
        }

        for (var _j18 = 0; _j18 < 11; _j18++) {
          if (snakes[i].head.x == _j18 && snakes[i].head.y == 15 && snakes[i].level == 5) {
            isCollide = true;
          }
        }

        for (var _j19 = 19; _j19 < 40; _j19++) {
          if (snakes[i].head.x == _j19 && snakes[i].head.y == 15 && snakes[i].level == 5) {
            isCollide = true;
          }
        }

        for (var _j20 = 10; _j20 < 20; _j20++) {
          if (snakes[i].head.x == _j20 && snakes[i].head.y == 24 && snakes[i].level == 5) {
            isCollide = true;
          }
        }
      }
    }
  }

  if (isCollide) {
    removeBodySnake(snake1);
    playSound(sounds.gameOver);
  }

  return isCollide;
}

function isPrime(n) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  var m = Math.sqrt(n); //returns the square root of the passed value

  for (var i = 2; i <= m; i++) {
    if (n % i == 0) return false;
  }

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
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    initGame();
  }
}

function moveBody(snake) {
  snake.body.unshift({
    x: snake.head.x,
    y: snake.head.y
  });
  snake.body.pop();
}

function turn(snake, direction) {
  var _oppositeDirections;

  var oppositeDirections = (_oppositeDirections = {}, _defineProperty(_oppositeDirections, DIRECTION.LEFT, DIRECTION.RIGHT), _defineProperty(_oppositeDirections, DIRECTION.RIGHT, DIRECTION.LEFT), _defineProperty(_oppositeDirections, DIRECTION.DOWN, DIRECTION.UP), _defineProperty(_oppositeDirections, DIRECTION.UP, DIRECTION.DOWN), _oppositeDirections);

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});
document.addEventListener(snake1.level == 2, function () {
  var audio = new Audio('Asset/game-new-level.mp3');
  audio.play();
}, {
  once: true
});

function initGame() {
  move(snake1);
}

initGame();