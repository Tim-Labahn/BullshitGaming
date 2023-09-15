<template>
  <div class="Minesweeper">
    <h1>Minesweeper</h1>
    <h4>PLACE FLAGS WITH RIGHT CLICK</h4>
    <dialog :open="startDialog">
      <p>Pick the Map Size!</p>
      <select name="map-größen" id="map-größen" v-model="selectedSize">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <button type="submit" class="pickSize" @click="(startDialog = false), checkSize(selectedSize), game()">Submit</button>
    </dialog>
    <div
      v-if="selectedSize && !startDialog"
      class="field"
      :class="{ smallGrid: selectedSize === 'small', midGrid: selectedSize === 'medium', bigGrid: selectedSize === 'large' }"
    >
      <template v-for="(column, indexY) in gameMap">
        <div
          class="tile"
          v-for="(tile, indexX) in column"
          @click="tileClick(indexX, indexY)"
          @contextmenu.prevent="placeFlag(tile)"
          :class="{ tileOpen: tile.isOpen }"
        >
          <div
            v-if="tile.isOpen && countBombs(indexX, indexY) !== 0"
            :class="{
              blueColor: countBombs(indexX, indexY) === 1,
              greenColor: countBombs(indexX, indexY) === 2,
              redColor: countBombs(indexX, indexY) === 3,
              purpleColor: countBombs(indexX, indexY) === 4,
              maroonColor: countBombs(indexX, indexY) === 5,
            }"
          >
            {{ countBombs(indexX, indexY) }}
          </div>
          <div v-if="tile.isOpen && countBombs(indexX, indexY) === 0"></div>
          <div v-if="tile.isBomb && tile.isOpen">💣</div>
          <div v-if="tile.isFlag">🚩</div>
          <div v-else-if="tile.isOpen"></div>
        </div>
      </template>
    </div>
    <dialog class="winText" :open="restart">
      <p>YOU WON</p>
      <button
        class="newGame"
        @click="
          resetGame();
          restart = false;
        "
      >
        Restart
      </button>
    </dialog>
    <dialog class="lose" :open="lostDialog">
      <p>YOU LOST</p>
      <button
        class="newGame"
        @click="
          resetGame();
          lostDialog = false;
        "
      >
        Restart
      </button>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const selectedSize = ref<'small' | 'medium' | 'large'>('small');
type Tile = {
  isBomb: boolean;
  isFlag: boolean;
  isOpen: boolean;
};

const gameMap = ref<Tile[][]>([]);
let width: number;
let height: number;
let difficulty = 1;
const startDialog = ref(true);
const restart = ref(false);
const lostDialog = ref(false);

//------------------------
function game() {
  checkSize(selectedSize.value);
  generateField();
  generateBomb();
}
function generateField() {
  for (let i = 0; i < height; i++) {
    const rowY = [];
    for (let k = 0; k < width; k++) {
      const field = {
        isBomb: false,
        isFlag: false,
        isOpen: false,
      };
      const rowX = field;
      rowY.push(rowX);
    }

    gameMap.value.push(rowY);
  }
}
function generateBomb() {
  for (const column of gameMap.value) {
    for (let i = 0; i <= difficulty; i++) {
      column[Math.round(Math.random() * (width - 1))].isBomb = true;
    }
  }
  const offsets = [
    [0, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
  ] as const;
  for (const offset of offsets) {
    gameMap.value[Math.floor(height / 2 + offset[0])][Math.floor(width / 2 + offset[1])].isBomb = false;
  }
}

function countBombs(x: number, y: number) {
  let numberOfBombs = 0;
  const offsets = [
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
  ] as const;
  for (const offset of offsets) {
    if (gameMap.value[y + offset[0]]?.[x + offset[1]]?.isBomb) {
      numberOfBombs++;
    }
  }
  return numberOfBombs;
}

function resetGame() {
  gameMap.value = [];
  selectedSize.value = 'small';
  startDialog.value = true;
}

function tileClick(x: number, y: number) {
  if (!gameMap.value[y]?.[x]) {
    return;
  }
  const tile = gameMap.value[y][x];

  if (tile.isFlag) {
    return;
  }

  if (tile.isBomb) {
    lostDialog.value = true;
  } else {
    if (!tile.isOpen) {
      tile.isOpen = true;
      setTimeout(() => checkArea(x, y), 200);
    }
  }

  checkWin();
}

function placeFlag(tile: Tile) {
  if (!tile.isFlag) {
    tile.isFlag = true;
  } else {
    tile.isFlag = false;
  }
}

function checkWin() {
  const isGameWon = gameMap.value.every(a => a.every(b => b.isOpen || b.isBomb));

  if (isGameWon && !lostDialog.value) {
    restart.value = true;
  }
}

function checkSize(currentSelectedSize: string) {
  if (currentSelectedSize) {
    if (currentSelectedSize === 'small') {
      width = 11;
      height = 9;
      difficulty = 1;
    } else if (currentSelectedSize === 'medium') {
      width = 23;
      height = 11;
      difficulty = 2;
    } else {
      width = 37;
      height = 13;
      difficulty = 5;
    }
  }
}
function checkArea(x: number, y: number) {
  if (countBombs(x, y) === 0) {
    const offsets = [
      [0, 1],
      [0, -1],
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 0],
      [1, 0],
      [-1, 1],
    ] as const;
    for (const offset of offsets) {
      if (!gameMap.value[y + offset[0]]?.[x + offset[1]]?.isOpen) {
        tileClick(x + offset[1], y + offset[0]);
      }
    }
  }
}
</script>
<style scoped lang="scss">
$white-color: #f0ead2;
$primary-color: #adc178;
$secondary-color-darkened: #7a6455;
$secondary-color: #a98467;
$primary-color-lightened: #dbe4b0;
$tileSize: 50px;

.Minesweeper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: $white-color;
}

.blueColor {
  color: blue;
}
.redColor {
  color: red;
}
.greenColor {
  color: green;
}
.purpleColor {
  color: purple;
}
.maroonColor {
  color: maroon;
}
.smallGrid {
  grid-template-columns: repeat(11, 1fr);
  width: calc(11 * $tileSize);
  display: grid;
}
.midGrid {
  grid-template-columns: repeat(23, 1fr);
  width: calc(23 * $tileSize);
  display: grid;
}
.bigGrid {
  grid-template-columns: repeat(37, 1fr);
  width: calc(37 * $tileSize);
  display: grid;
}
.field {
  background-color: $primary-color;
  font-weight: bold;
  font-size: 1.2rem;
}
.tile:nth-child(even) {
  background-color: $primary-color-lightened;
}

h1 {
  font-size: 8vh;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 0;
  color: $secondary-color-darkened;
}
h4 {
  margin-top: 5px;
  color: $secondary-color-darkened;
}
.tile {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #6c584c;
  box-sizing: border-box;
}
.tile[isMiddle] {
  background-color: #8d9e5f;
}

.tileOpen {
  background-color: #d5b89a;
}
.tileOpen:nth-child(even) {
  background-color: #ffe8d6;
}
dialog {
  width: 15vw;
  align-items: center;
  background-color: $white-color;
  font-size: 3vh;
}

button {
  width: 15vh;
  background-color: #ffffff;
}

button:hover {
  background-color: #e2dcdc;
}

.start {
  width: 25vh;
}
select {
  width: 23vh;
}

.pickSize {
  width: 23vh;
}
</style>
