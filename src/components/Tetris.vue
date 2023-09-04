<template>
  <div style="background-color: grey; width: 400px; height: 100px; position: absolute; left: 750px; top: 106px">‍</div>
  <div class="tetris">
    <button class="btn btn-primary" @click="console.log(gameMap)">Show Game Map</button>
    <button class="btn btn-primary" @click="spawnTetromini()">spawnTetromini</button>
    <button class="btn btn-primary" @click="spawnFullRow()">spawnFullRow</button>
    <dialog :open="lose" style="border-radius: 10px; top: 450px; height: 150px; width: 200px; text-align: center">
      GAME OVER
      <br />
      <br />
      <br />
      <button class="btn btn-primary" @click="restart()">Restart</button>
    </dialog>
    <div class="field d-flex justify-content-center align-items-center pt-5" style="">
      <div v-for="row in gameMap">
        <div v-for="tile in row" style="width: 32px; height: 32px; border: 1px solid black">
          <div v-if="tile.color === 'black'" style="background-color: black; width: 32px; height: 32px">‍</div>
          <div v-if="tile.color === 'white'" style="background-color: whitesmoke; width: 32px; height: 32px">‍</div>
          <div v-if="tile.color === 'grey'" style="background-color: grey; width: 32px; height: 32px">‍</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const pressedKeys = ref({
  a: false,
  c: false,
  ' ': false,
  d: false,
  e: false,
  q: false,
  s: false,
});

window.onkeyup = e => {
  pressedKeys.value[e.key as keyof typeof pressedKeys.value] = false;
};
window.onkeydown = e => {
  pressedKeys.value[e.key as keyof typeof pressedKeys.value] = true;
};

const J = ref<number[][]>([
  [0, 1, 1, 1],
  [0, 0, 0, 1],
]);
const L = ref<number[][]>([
  [1, 1, 1, 0],
  [1, 0, 0, 0],
]);
const T = ref<number[][]>([
  [1, 1, 1, 0],
  [0, 1, 0, 0],
]);
const I = ref<number[][]>([
  [0, 0, 0, 0],
  [1, 1, 1, 1],
]);
const S = ref<number[][]>([
  [0, 0, 1, 1],
  [0, 1, 1, 0],
]);
const Z = ref<number[][]>([
  [1, 1, 0, 0],
  [0, 1, 1, 0],
]);
const O = ref<number[][]>([
  [0, 1, 1, 0],
  [0, 1, 1, 0],
]);

type TileType = {
  color: string;
};

const TICKS_PER_SECOND = 3;
const gameMap = ref<TileType[][]>([]);
const gameSizeX = 10;
const gameSizeY = 21;

generateMap();
function generateMap() {
  if (gameMap.value !== null) {
    gameMap.value = [];
  }
  for (let x = 0; x < gameSizeX; x++) {
    const rowY: TileType[] = [];
    for (let y = 0; y < gameSizeY; y++) {
      const field = {
        color: 'white',
      };
      const rowX = field;
      rowY.push(rowX);
    }
    gameMap.value.push(rowY);
  }
}

function restart() {
  generateMap();
  lose = false;
  blockFall();
  spawnTetromini();
}

setInterval(gameLoop, 1000 / TICKS_PER_SECOND);
setInterval(blockMovement, 1000 / (TICKS_PER_SECOND * 5));
function gameLoop() {
  blockFall();

  checkFullRow();
}
function blockMovement() {
  function checkIsBlocked(xOffset: -1 | 1) {
    for (let rowIndex = 0; rowIndex < gameMap.value.length; rowIndex++) {
      const row = gameMap.value[rowIndex];
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const currentTile = gameMap.value[rowIndex][colIndex];
        const tileLR = gameMap.value[rowIndex + xOffset]?.[colIndex];
        if (currentTile.color === 'black' && (!tileLR || (tileLR && tileLR.color === 'grey'))) {
          return true;
        }
      }
    }
    return false;
  }
  if (pressedKeys.value.a && !checkIsBlocked(-1)) {
    for (let y = gameMap.value[0].length - 1; y >= 0; y--) {
      for (let x = 0; x < gameMap.value.length; x++) {
        if (gameMap.value[x][y].color === 'black' && gameMap.value[x - 1] && gameMap.value[x - 1][y].color === 'white') {
          gameMap.value[x][y].color = 'white';
          gameMap.value[x - 1][y].color = 'black';
        }
      }
    }
  }
  if (pressedKeys.value.d && !checkIsBlocked(+1)) {
    for (let y = gameMap.value[0].length - 1; y >= 0; y--) {
      for (let x = gameMap.value.length - 1; x >= 0; x--) {
        if (gameMap.value[x][y].color === 'black' && gameMap.value[x + 1] && gameMap.value[x + 1][y].color === 'white') {
          gameMap.value[x][y].color = 'white';
          gameMap.value[x + 1][y].color = 'black';
        }
      }
    }
  }
}

function checkFullRow() {
  let blockInRow = 0;
  for (let row = 0; row < gameSizeY; row++) {
    for (let tile = 0; tile < 10; tile++) {
      if (gameMap.value[tile][row].color === 'grey') {
        blockInRow++;
      }
    }
    if (blockInRow === 10) {
      for (let y = 0; y < 10; y++) {
        gameMap.value[y].splice(row, 1);
      }
      for (let y = 0; y < 10; y++) {
        const field = {
          color: 'white',
        };
        gameMap.value[y].splice(0, 0, field);
      }
    } else {
      blockInRow = 0;
    }
  }
}

function blockFall() {
  if (checkBlockCanMoveDown()) {
    for (let greyY = 0; greyY < gameSizeY; greyY++) {
      for (let greyX = 0; greyX < gameSizeX; greyX++) {
        if (gameMap.value[greyX][greyY].color === 'black') {
          gameMap.value[greyX][greyY].color = 'grey';
        }
      }
    }
    spawnTetromini();
  } else {
    for (let y = gameSizeY; y >= 0; y--) {
      for (let x = gameSizeX; x >= 0; x--) {
        if (gameMap.value[x]?.[y]?.color === 'black' && gameMap.value[x]?.[y + 1]?.color === 'white') {
          gameMap.value[x][y].color = 'white';
          gameMap.value[x][y + 1].color = 'black';
        }
      }
    }
  }
}

function checkBlockCanMoveDown() {
  const filteredTiles = [];
  for (let rowIndex = 0; rowIndex < gameMap.value.length - 1; rowIndex++) {
    const row = gameMap.value[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
      const currentTile = row[colIndex];
      const tileBelow = gameMap.value[rowIndex][colIndex + 1];

      if ((currentTile.color === 'black' && !tileBelow) || (currentTile.color === 'black' && tileBelow.color === 'grey')) {
        filteredTiles.push(currentTile);
      }
    }
  }
  if (filteredTiles.length <= 0) {
    return false;
  } else {
    return filteredTiles;
  }
}

let lose = false;
function gameEnd() {
  lose = true;
}

const curentTetromine = ref(0);
const spawnOrder = ref([J, L, T, I, S, Z, O]);

function spawnTetromini() {
  for (let row = 0; row < 2; row++) {
    for (let tile = 0; tile < 10; tile++) {
      if (gameMap.value[tile][row].color === 'grey') {
        gameEnd();
        return;
      }
    }
  }
  if (!lose) {
    curentTetromine.value++;
    if (curentTetromine.value > 6) {
      curentTetromine.value = 0;
    }
    for (let row = 0; row < 2; row++) {
      for (let tile = 0; tile < 4; tile++) {
        if (spawnOrder.value[curentTetromine.value].value[row][tile] === 1) {
          gameMap.value[tile + 3][row].color = 'black';
        }
      }
    }
  }
}
function spawnFullRow() {
  if (!lose) {
    for (let tile = 0; tile < gameSizeX; tile++) {
      gameMap.value[tile][gameSizeY - 1].color = 'black';
    }
  }
}
</script>

<style scoped lang="scss">
.tetris {
  background-color: grey;
  width: 100vw;
  height: 96vh;
}
.cells {
  height: 40px;
  width: 40px;
  background-color: #ffffff;
}
</style>
