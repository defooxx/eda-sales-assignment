const gameToggle = document.getElementById("gameToggle");
const gameSection = document.getElementById("gameSection");
const canvas = document.getElementById("edaGame");
const ctx = canvas.getContext("2d");
const gameMessage = document.getElementById("gameMessage");

let animationId = null;
let gameStarted = false;
let gameWon = false;
let gameLost = false;

const keys = {
  left: false,
  right: false
};

const player = {
  x: 35,
  y: 285,
  width: 34,
  height: 38,
  dx: 0,
  dy: 0,
  speed: 4,
  jumpPower: -11,
  grounded: false
};

const startPosition = {
  x: 35,
  y: 285
};

const gravity = 0.55;

let platforms = [
  { x: 40, y: 320, width: 120, height: 13, dx: 0.8 },
  { x: 185, y: 290, width: 115, height: 13, dx: -0.9 },
  { x: 330, y: 260, width: 115, height: 13, dx: 0.9 },
  { x: 475, y: 230, width: 115, height: 13, dx: -1.0 },
  { x: 620, y: 200, width: 115, height: 13, dx: 1.0 },
  { x: 765, y: 170, width: 115, height: 13, dx: -0.9 },
  { x: 620, y: 135, width: 115, height: 13, dx: 0.8 },
  { x: 475, y: 105, width: 115, height: 13, dx: -0.8 },
  { x: 330, y: 78, width: 115, height: 13, dx: 0.7 }
];

const originalPlatforms = platforms.map(platform => ({ ...platform }));

const goal = {
  x: 345,
  y: 32,
  width: 90,
  height: 34,
  text: "EDA"
};

gameToggle.addEventListener("click", () => {
  gameSection.scrollIntoView({ behavior: "smooth" });

  if (!gameStarted || gameLost || gameWon) {
    startGame();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") keys.left = true;
  if (event.key === "ArrowRight") keys.right = true;

  if (event.code === "Space") {
    event.preventDefault();

    if (gameLost || gameWon) {
      startGame();
      return;
    }

    if (player.grounded) {
      player.dy = player.jumpPower;
      player.grounded = false;
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") keys.left = false;
  if (event.key === "ArrowRight") keys.right = false;
});

function startGame() {
  resetGame();

  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  gameStarted = true;
  animationId = requestAnimationFrame(gameLoop);
}

function stopGame() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function resetGame() {
  player.x = startPosition.x;
  player.y = startPosition.y;
  player.dx = 0;
  player.dy = 0;
  player.grounded = false;

  platforms = originalPlatforms.map(platform => ({ ...platform }));

  gameWon = false;
  gameLost = false;

  keys.left = false;
  keys.right = false;

  gameMessage.textContent = "Use ← → to move and Space to jump. Reach the goal to win!";
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#ffe6f5");
  gradient.addColorStop(0.5, "#efe3ff");
  gradient.addColorStop(1, "#dff3ff");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Soft ground/cloud strip at the bottom
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.fillRect(0, canvas.height - 28, canvas.width, 28);
}

function drawPlayer() {
  // shadow
  ctx.fillStyle = "rgba(80, 50, 120, 0.25)";
  ctx.fillRect(player.x + 6, player.y + player.height + 2, 25, 4);

  // body outline
  ctx.fillStyle = "#4b2e83";
  ctx.fillRect(player.x + 5, player.y + 6, 26, 28);
  ctx.fillRect(player.x + 2, player.y - 2, 32, 24);

  // body fill - stronger mint so it separates from pastel background
  ctx.fillStyle = "#7fffd4";
  ctx.fillRect(player.x + 8, player.y + 9, 20, 22);
  ctx.fillRect(player.x + 5, player.y + 1, 26, 18);

  // ears
  ctx.fillStyle = "#4b2e83";
  ctx.fillRect(player.x - 1, player.y + 8, 5, 9);
  ctx.fillRect(player.x + 31, player.y + 8, 5, 9);

  ctx.fillStyle = "#7fffd4";
  ctx.fillRect(player.x, player.y + 9, 4, 7);
  ctx.fillRect(player.x + 31, player.y + 9, 4, 7);

  // eyes
  ctx.fillStyle = "#071b33";
  ctx.fillRect(player.x + 10, player.y + 8, 5, 5);
  ctx.fillRect(player.x + 22, player.y + 8, 5, 5);

  // eye shine
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(player.x + 11, player.y + 8, 2, 2);
  ctx.fillRect(player.x + 23, player.y + 8, 2, 2);

  // mouth
  ctx.fillStyle = "#4b2e83";
  ctx.fillRect(player.x + 14, player.y + 17, 10, 3);

  // legs
  ctx.fillStyle = "#4b2e83";
  ctx.fillRect(player.x + 8, player.y + 31, 8, 7);
  ctx.fillRect(player.x + 21, player.y + 31, 8, 7);
}

function drawPlatforms() {
  platforms.forEach((platform) => {
    ctx.fillStyle = "#ff8abb";
    ctx.fillRect(platform.x, platform.y, platform.width, 4);

    ctx.fillStyle = "#6b4c9a";
    ctx.fillRect(platform.x, platform.y + 4, platform.width, platform.height);

    ctx.fillStyle = "#efe3ff";
    for (let i = 16; i < platform.width; i += 28) {
      ctx.fillRect(platform.x + i, platform.y + 8, 4, 4);
    }
  });
}

function drawGoal() {
  ctx.fillStyle = "#fff7fb";
  ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

  ctx.strokeStyle = "#a98bff";
  ctx.lineWidth = 2;
  ctx.strokeRect(goal.x, goal.y, goal.width, goal.height);

  ctx.fillStyle = "#6b4c9a";
  ctx.font = "bold 17px Arial";
  ctx.fillText(goal.text, goal.x + 27, goal.y + 22);

  ctx.fillStyle = "#ff8abb";
  ctx.fillRect(goal.x + goal.width + 10, goal.y + 7, 28, 16);

  ctx.fillStyle = "#6b4c9a";
  ctx.fillRect(goal.x + goal.width + 7, goal.y + 4, 4, 30);
}

function drawStatusText() {
  ctx.fillStyle = "#6b4c9a";
  ctx.font = "15px Arial";

  ///if (!gameWon && !gameLost) {
  ///  ctx.fillText("Climb the data stairs to reach EDA ✨", 30, 30);
  ///}

  if (gameWon) {
    // Clear message box
    ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
    ctx.fillRect(285, 155, 430, 82);

    ctx.strokeStyle = "#a98bff";
    ctx.lineWidth = 2;
    ctx.strokeRect(285, 155, 430, 82);

    ctx.fillStyle = "#5d3c99";
    ctx.font = "bold 25px Arial";
    ctx.fillText("Success! You reached EDA.", 335, 190);

    ctx.font = "15px Arial";
    ctx.fillText("Press Space to play again.", 350, 218);
  }

  if (gameLost) {
    // Clear message box
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.fillRect(330, 150, 340, 95);

    ctx.strokeStyle = "#ff8abb";
    ctx.lineWidth = 3;
    ctx.strokeRect(330, 150, 340, 95);

    ctx.fillStyle = "#9b2f61";
    ctx.font = "bold 28px Arial";
    ctx.fillText("You lose, try again!", 370, 188);

    ctx.fillStyle = "#6b4c9a";
    ctx.font = "15px Arial";
    ctx.fillText("Reach the EDA goal", 30, 30);
  }
}

function movePlatforms() {
  platforms.forEach((platform) => {
    platform.x += platform.dx;

    if (platform.x <= 10 || platform.x + platform.width >= canvas.width - 10) {
      platform.dx *= -1;
    }
  });
}

function updatePlayer() {
  if (gameLost || gameWon) return;

  player.dx = 0;

  if (keys.left) player.dx = -player.speed;
  if (keys.right) player.dx = player.speed;

  player.x += player.dx;
  player.dy += gravity;
  player.y += player.dy;

  player.grounded = false;

  platforms.forEach((platform) => {
    const isFalling = player.dy >= 0;

    const hitsPlatform =
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height <= platform.y + platform.height &&
      player.y + player.height + player.dy >= platform.y;

    if (isFalling && hitsPlatform) {
      player.y = platform.y - player.height;
      player.dy = 0;
      player.grounded = true;
      player.x += platform.dx;
    }
  });

  if (player.x < 0) player.x = 0;

  if (player.x + player.width > canvas.width) {
    player.x = canvas.width - player.width;
  }

  if (player.y > canvas.height + 30) {
    gameLost = true;
    gameMessage.textContent = "Use ← → to move and Space to jump. Reach the EDA goal.";
    drawFrame();
    stopGame();
  }

  const reachedGoal =
    player.x < goal.x + goal.width &&
    player.x + player.width > goal.x &&
    player.y < goal.y + goal.height &&
    player.y + player.height > goal.y;

  if (reachedGoal) {
    gameWon = true;
    gameMessage.textContent = "You win! Data buddy reached EDA. Press Space to play again.";
    drawFrame();
    stopGame();
  }
}

function drawFrame() {
  drawBackground();
  drawPlatforms();
  drawGoal();
  drawPlayer();
  drawStatusText();
}

function gameLoop() {
  drawBackground();
  movePlatforms();
  drawPlatforms();
  drawGoal();
  updatePlayer();
  drawPlayer();
  drawStatusText();

  if (!gameLost && !gameWon) {
    animationId = requestAnimationFrame(gameLoop);
  }
}

// Draw first static frame before the game starts
drawFrame();