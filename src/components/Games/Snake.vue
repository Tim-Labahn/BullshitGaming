<template>
  <div class="snakeGame">
    <div class="field">
      <template v-for="(row, indexY) in gameMap">
        <div v-for="(tile, indexX) in row" class="tile d-flex justify-content-center align-items-center">
          <div v-if="tile.hasApple">🍎</div>
          <div v-if="snake.find(a => a.x === indexX && a.y === indexY)" class="snake w-100 h-100"></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

type TileType = {
  hasApple: boolean;
};
type Snake = {
  x: number;
  y: number;
}[];
const pressedKey = ref<'w' | 'a' | 's' | 'd'>('d');
const snake = ref<Snake>([
  { x: 7, y: 7 },
  { x: 6, y: 7 },
  { x: 5, y: 7 },
  { x: 4, y: 7 },
  { x: 3, y: 7 },
]);
const gameMap = ref<TileType[][]>([]);
const mapSizeX = 17;
const mapSizeY = 15;
const gameTicks = 3;
const apple = {
  x: Math.floor(Math.random() * mapSizeX),
  y: Math.floor(Math.random() * mapSizeY),
};
setInterval(() => gameLoop(), 1000 / gameTicks);

function gameLoop() {
  snakeMovement();
}

function generateMap() {
  if (gameMap.value) {
    gameMap.value = [];
  }
  for (let indexY = 0; indexY < mapSizeY; indexY++) {
    const rowY: TileType[] = [];
    for (let indexX = 0; indexX < mapSizeX; indexX++) {
      const tile = {
        hasApple: false,
      };
      rowY.push(tile);
    }
    gameMap.value.push(rowY);
  }
  generateApple();
}
generateMap();
function snakeMovement() {
  const head = { ...snake.value[0] };
  if (pressedKey.value === 'a') {
    head.x -= 1;
  } else if (pressedKey.value === 'd') {
    head.x += 1;
  } else if (pressedKey.value === 's') {
    head.y += 1;
  } else if (pressedKey.value === 'w') {
    head.y -= 1;
  }

  snake.value.unshift(head);
  eatApple();
  if (snake.value.length > 3) {
    snake.value.pop();
  }
  if (head.x % mapSizeX < 0) {
    head.x = mapSizeX - 1;
    head.y %= mapSizeY;
  } else if (head.y % mapSizeY < 0) {
    head.x %= mapSizeX;
    head.y = mapSizeY - 1;
  } else {
    head.x %= mapSizeX;
    head.y %= mapSizeY;
  }
  loseCheck();
}

window.onkeydown = e => {
  if (e.key === 'w' || e.key === 's' || e.key === 'a' || e.key === 'd') {
    if (
      (e.key === 'a' && pressedKey.value === 'd') ||
      (e.key === 'd' && pressedKey.value === 'a') ||
      (e.key === 's' && pressedKey.value === 'w') ||
      (e.key === 'w' && pressedKey.value === 's')
    )
      return;
    pressedKey.value = e.key as typeof pressedKey.value;
  }
};

function generateApple() {
  apple.x = Math.floor(Math.random() * mapSizeX);
  apple.y = Math.floor(Math.random() * mapSizeY);
  gameMap.value[apple.y][apple.x].hasApple = true;
}
function eatApple() {
  if (snake.value[0].y === apple.y && snake.value[0].x === apple.x) {
    gameMap.value[apple.y][apple.x].hasApple = false;
    snake.value.push({ ...snake.value[snake.value.length - 1] });
    generateApple();
  }
}

function loseCheck() {
  if (snake.value.find((a, index) => index !== 0 && a.x === snake.value[0].x && a.y === snake.value[0].y)) {
    console.log('you lost');
  }
}
</script>
<style scoped lang="scss">
$white-color: #f0ead2;
$primary-color: #adc178;
$primary-color-lightened: #dbe4b0;
$tileSize: 50px;
.snakeGame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: $white-color;
}
.field {
  grid-template-columns: repeat(17, 1fr);
  width: calc(17 * $tileSize);
  display: grid;
}

.tile {
  width: $tileSize;
  height: $tileSize;
  background-color: $primary-color;
}
.tile:nth-child(odd) {
  background-color: $primary-color-lightened;
}

.snake {
  display: flex;
  background-color: blue;
}

.snake > div {
  width: $tileSize;
  height: $tileSize;
  display: flex;
  justify-content: center;
  align-items: center;
}

.snake:first-of-type {
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
}

.snake:last-of-type {
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
}

/* Füge hier den gewünschten Farbverlauf hinzu */
</style>
