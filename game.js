const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const bestText = document.querySelector('#bestText');
const statusText = document.querySelector('#statusText');

const groundY = 292;
const dino = { x: 108, y: groundY - 128, width: 90, height: 128, velocityY: 0, grounded: true };
const dinoImages = {
  run: [
    loadImage('assets/dino-run-1.png'),
    loadImage('assets/dino-run-2.png'),
    loadImage('assets/dino-run-3.png')
  ],
  jump: loadImage('assets/dino-jump.png'),
  hit: loadImage('assets/dino-hit.png')
};
const campusImage = loadImage('assets/nths.png');
let campusOpaqueBounds;
const game = { state: 'ready', score: 0, best: Math.floor(Number(localStorage.getItem('dino-best') || 0)), speed: 6, spawnTimer: 0, lastTime: 0, groundOffset: 0 };
const obstacles = [];
const clouds = [
  { x: 90, y: 70, width: 76, speed: .18 },
  { x: 430, y: 112, width: 54, speed: .12 },
  { x: 760, y: 58, width: 92, speed: .2 }
];

bestText.textContent = String(game.best).padStart(5, '0');

function loadImage(source) {
  const image = new Image();
  image.src = source;
  return image;
}

function detectOpaqueBounds(image) {
  const probe = document.createElement('canvas');
  probe.width = image.naturalWidth;
  probe.height = image.naturalHeight;
  const probeContext = probe.getContext('2d');
  probeContext.drawImage(image, 0, 0);
  const pixels = probeContext.getImageData(0, 0, probe.width, probe.height).data;
  let top = probe.height;
  let bottom = -1;

  for (let y = 0; y < probe.height; y += 1) {
    for (let x = 0; x < probe.width; x += 1) {
      if (pixels[(y * probe.width + x) * 4 + 3] > 10) {
        top = Math.min(top, y);
        bottom = Math.max(bottom, y);
      }
    }
  }

  return bottom >= 0 ? { top, bottom } : { top: 0, bottom: probe.height - 1 };
}

function setStatus(text) {
  statusText.textContent = text;
}

function resetGame() {
  obstacles.length = 0;
  dino.y = groundY - dino.height;
  dino.velocityY = 0;
  dino.grounded = true;
  game.score = 0;
  game.speed = 6;
  game.spawnTimer = 70;
  game.state = 'playing';
  setStatus('奔跑中');
}

function jump() {
  if (game.state !== 'playing') {
    resetGame();
    return;
  }
  if (dino.grounded) {
    dino.velocityY = -14.5;
    dino.grounded = false;
  }
}

function addObstacle() {
  const height = 34 + Math.random() * 30;
  const width = 20 + Math.random() * 13;
  obstacles.push({ x: canvas.width + 20, y: groundY - height, width, height });
  game.spawnTimer = 64 + Math.random() * 65 - Math.min(game.score / 12, 28);
}

function overlaps(first, second) {
  const inset = 7;
  return first.x + inset < second.x + second.width &&
    first.x + first.width - inset > second.x &&
    first.y + inset < second.y + second.height &&
    first.y + first.height - 4 > second.y;
}

function endGame() {
  game.state = 'over';
  game.best = Math.floor(Math.max(game.best, game.score));
  localStorage.setItem('dino-best', game.best);
  bestText.textContent = String(game.best).padStart(5, '0');
  setStatus('撞到了！再試一次');
}

function update(delta) {
  if (game.state !== 'playing') return;
  const step = delta / 16.67;
  game.score += delta * .006;
  game.speed = Math.min(12, 6 + game.score / 180);
  game.groundOffset = (game.groundOffset + game.speed * step) % 34;
  game.spawnTimer -= step;
  if (game.spawnTimer <= 0) addObstacle();

  dino.velocityY += .72 * step;
  dino.y += dino.velocityY * step;
  if (dino.y >= groundY - dino.height) {
    dino.y = groundY - dino.height;
    dino.velocityY = 0;
    dino.grounded = true;
  }

  obstacles.forEach(obstacle => { obstacle.x -= game.speed * step; });
  while (obstacles[0] && obstacles[0].x + obstacles[0].width < -20) obstacles.shift();
  if (obstacles.some(obstacle => overlaps(dino, obstacle))) endGame();

  scoreText.textContent = String(Math.floor(game.score)).padStart(5, '0');
}

function drawCloud(cloud) {
  context.fillStyle = 'rgb(239, 244, 248)';
  context.beginPath();
  context.arc(cloud.x, cloud.y, cloud.width * .18, 0, Math.PI * 2);
  context.arc(cloud.x + cloud.width * .28, cloud.y - 10, cloud.width * .24, 0, Math.PI * 2);
  context.arc(cloud.x + cloud.width * .55, cloud.y, cloud.width * .2, 0, Math.PI * 2);
  context.fill();
  context.fillRect(cloud.x - 2, cloud.y, cloud.width * .58, 15);
}

function drawDino() {
  const image = game.state === 'over'
    ? dinoImages.hit
    : dino.grounded
      ? dinoImages.run[Math.floor(game.score * .90) % dinoImages.run.length]
      : dinoImages.jump;
  if (image.complete && image.naturalWidth > 0) {
    context.drawImage(image, dino.x, dino.y, dino.width, dino.height);
  }
}

function drawObstacle(obstacle) {
  context.fillStyle = '#4f9d69';
  context.fillRect(obstacle.x + obstacle.width * .28, obstacle.y, obstacle.width * .44, obstacle.height);
  context.fillRect(obstacle.x, obstacle.y + obstacle.height * .42, obstacle.width, 8);
  context.fillRect(obstacle.x + obstacle.width * .72, obstacle.y + obstacle.height * .18, 7, 20);
  context.fillStyle = '#28704f';
  context.fillRect(obstacle.x + obstacle.width * .28, obstacle.y + 8, 5, obstacle.height - 8);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
  skyGradient.addColorStop(0, '#b9e7e5');
  skyGradient.addColorStop(1, '#f7d9aa');
  context.fillStyle = skyGradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (campusImage.complete && campusImage.naturalWidth > 0) {
    const campusHeight = canvas.width * campusImage.naturalHeight / campusImage.naturalWidth;
    campusOpaqueBounds ||= detectOpaqueBounds(campusImage);
    const campusOpaqueBottom = campusOpaqueBounds.bottom / campusImage.naturalHeight;
    context.globalAlpha = .58;
    context.drawImage(campusImage, 0, groundY - campusHeight * campusOpaqueBottom, canvas.width, campusHeight);
    context.globalAlpha = 1;
  }

  context.fillStyle = 'rgba(248, 198, 109, .82)';
  context.beginPath();
  context.arc(790, 85, 42, 0, Math.PI * 2);
  context.fill();
  clouds.forEach(drawCloud);

  context.fillStyle = '#d99b6a';
  context.fillRect(0, groundY, canvas.width, 4);
  context.fillStyle = '#b97859';
  for (let x = -game.groundOffset; x < canvas.width; x += 34) context.fillRect(x, groundY + 16, 17, 3);
  for (let x = 10 - game.groundOffset * .6; x < canvas.width; x += 72) context.fillRect(x, groundY + 35, 8, 3);

  obstacles.forEach(drawObstacle);
  drawDino();

  if (game.state !== 'playing') {
    context.fillStyle = 'rgba(36, 51, 59, .14)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.textAlign = 'center';
    context.fillStyle = '#3d67c0d1';
    context.font = '700 28px Georgia';
    context.fillText(game.state === 'ready' ? '準備好了嗎？' : '再跑一次！', canvas.width / 2, 145);
    context.font = '16px Trebuchet MS';
    context.fillText('按空白鍵或點擊畫面開始', canvas.width / 2, 178);
  }
}

function frame(time) {
  const delta = Math.min(time - game.lastTime || 16.67, 34);
  game.lastTime = time;
  update(delta);
  draw();
  requestAnimationFrame(frame);
}

window.addEventListener('keydown', event => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    event.preventDefault();
    jump();
  }
});
canvas.addEventListener('pointerdown', jump);
requestAnimationFrame(frame);
