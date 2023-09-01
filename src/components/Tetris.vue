<template>
  <div class="tetris">
    <button class="btn btn-primary" @click="console.log(gameMap)">Show Game Map</button>
    <button class="btn btn-primary" @click="spawnTetromine()">spawn tetromine at 4|0</button>
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
  [1, 1, 1, 1],
  [0, 0, 0, 0],
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
  positionX: number;
  positionY: number;
};

const TICKS_PER_SECOND = 4;
const gameMap = ref<TileType[][]>([]);

generateMap();

function generateMap() {
  if (gameMap.value !== null) {
    gameMap.value = [];
  }
  for (let x = 0; x < 10; x++) {
    const rowY: TileType[] = [];
    for (let y = 0; y < 20; y++) {
      const field = {
        color: 'white',
        positionX: x,
        positionY: y,
      };
      const rowX = field;
      rowY.push(rowX);
    }
    gameMap.value.push(rowY);
  }
}

setInterval(gameLoop, 1000 / TICKS_PER_SECOND);
function gameLoop() {
  blockMovement();
}

function blockMovement() {
  for (let y = 19; y >= 0; y--) {
    for (let x = 9; x >= 0; x--) {
      if (
        (gameMap.value[x][y].color === 'black' && !gameMap.value[x][y + 1]) ||
        (gameMap.value[x][y].color === 'black' && gameMap.value[x]?.[y + 1]?.color !== 'white')
      ) {
        for (let greyY = 0; greyY < gameMap.value[x].length; greyY++) {
          for (let greyX = 0; greyX < gameMap.value.length; greyX++) {
            if (gameMap.value[greyX][greyY].color === 'black') {
              gameMap.value[greyX][greyY].color = 'grey';
            }
          }
        }
      }
      if (gameMap.value[x][y].color === 'black' && gameMap.value[x]?.[y + 1]?.color === 'white') {
        gameMap.value[x][y].color = 'white';
        gameMap.value[x][y + 1].color = 'black';
      }
    }
  }
}

const curentTetromine = ref(0);
const spawnOrder = ref([J, L, T, I, S, Z, O]);
function spawnTetromine() {
  console.log('spawned');
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
</script>

<style scoped lang="scss">
.tetris {
  background-color: gray;
  width: 100vw;
  height: 96vh;
}
.cells {
  height: 40px;
  width: 40px;
  background-color: #ffffff;
}
</style>
