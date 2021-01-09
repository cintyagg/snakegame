const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
const snake = [];
let count = 0;
let direction;

const image = new Image(box, box);

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

const position = () => {
  return {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
  };
}

let food = position();

const createBG = () => {
  context.fillStyle = "#8EE451";
  context.fillRect(0, 0, 16 * box, 16 * box);
};

const createLittleSnake = () => {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = '#cf0404';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
};

const update = (event) => {
  if (event.keyCode === 37 && direction !== 'right') direction = 'left';
  if (event.keyCode === 38 && direction !== 'down') direction = 'up';
  if (event.keyCode === 39 && direction !== 'left') direction = 'right';
  if (event.keyCode === 40 && direction !== 'up') direction = 'down';
};

function drawImageActualSize() {
  context.drawImage(this, food.x, food.y, this.width, this.height);
}

function drawFood(){
  context.fillStyle = "#31312A";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

const startGame = () => {
  if (snake[0].x > 15 * box && direction !== 'left') snake[0].x = 0;
  if (snake[0].x < 0 && direction !== 'right') snake[0].x = 15 * box;
  if (snake[0].y > 15 * box && direction !== 'up') snake[0].y = 0;
  if (snake[0].y < 0 && direction != 'down') snake[0].y = 15 * box;
  
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(game);
      alert(`Game Over!!!\n\nYou ate ${count} 🐭.`);
    }
  }

  createBG();
  createLittleSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'right') snakeX += box;
  if (direction === 'left') snakeX -= box;
  if (direction === 'up') snakeY -= box;
  if (direction === 'down') snakeY += box;

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop();
  } else {
    count++;
    food = position()
  }

  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
};

const game = setInterval(startGame, 100);