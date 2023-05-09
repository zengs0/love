var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
 // 定义游戏参数
var gridSize = 10;
var snake = [{x: 1, y: 1}];
var food = {x: 10, y: 10};
var direction = "right";
var score = 0;
 // 绘制游戏界面
function draw() {
  // 绘制背景
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
   // 绘制蛇
  context.fillStyle = "black";
  for (var i = 0; i < snake.length; i++) {
    context.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
  }
   // 绘制食物
  context.fillStyle = "red";
  context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
   // 绘制得分
  context.fillStyle = "black";
  context.fillText("得分：" + score, 10, canvas.height - 10);
}
 // 更新游戏状态
function update() {
  // 更新蛇的位置
  var head = {x: snake[0].x, y: snake[0].y};
  switch (direction) {
    case "up":
      head.y--;
      if (head.y < 0) {
        head.y = canvas.height / gridSize - 1;
      }
      break;
    case "right":
      head.x++;
      if (head.x >= canvas.width / gridSize) {
        head.x = 0;
      }
      break;
    case "down":
      head.y++;
      if (head.y >= canvas.height / gridSize) {
        head.y = 0;
      }
      break;
    case "left":
      head.x--;
      if (head.x < 0) {
        head.x = canvas.width / gridSize - 1;
      }
      break;
  }
  snake.unshift(head);
   // 判断是否吃到食物
  if (head.x == food.x && head.y == food.y) {
    score++;
    food.x = Math.floor(Math.random() * canvas.width / gridSize);
    food.y = Math.floor(Math.random() * canvas.height / gridSize);
  } else {
    snake.pop();
  }
   // 判断游戏是否结束
  if (head.x < 0 || head.x >= canvas.width / gridSize ||
      head.y < 0 || head.y >= canvas.height / gridSize ||
      isCollision()) {
    alert("游戏结束，得分：" + score);
    reset();
  }
}
 // 判断是否与自己相撞
function isCollision() {
  for (var i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      return true;
    }
  }
  return false;
}
 // 重置游戏状态
function reset() {
  snake = [{x: 1, y: 1}];
  food = {x: 10, y: 10};
  direction = "right";
  score = 0;
}
 // 监听键盘事件
document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 38:
      direction = "up";
      break;
    case 39:
      direction = "right";
      break;
    case 40:
      direction = "down";
      break;
    case 37:
      direction = "left";
      break;
  }
});
 // 游戏循环
setInterval(function() {
  update();
  draw();
}, 100);
