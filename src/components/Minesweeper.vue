<template>
  <div class="Minesweeper">
    <h1>Minesweeper</h1>
    <h4>PLACE FLAGS WITH RIGHT CLICK</h4>
    <dialog :open="startOpen">
      <p>Pick the Map Size!</p>
      <select name="map-größen" id="map-größen" v-model="selectedSize">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      <button type="submit" class="pickSize" @click="(startOpen = false), checkSize(selectedSize), game()">Submit</button>
    </dialog>
    <div
      v-if="selectedSize"
      class="field"
      :class="{ smallGrid: selectedSize === 'small', midGrid: selectedSize === 'medium', bigGrid: selectedSize === 'large' }"
    >
      <template v-for="(column, indexY) in gameMap">
        <div class="tile" v-for="(tile, indexX) in column" @click="tileClick(tile)" @contextmenu.prevent="placeFlag(tile)">
          <div v-if="tile.isOpen">{{ countBombs(indexY, indexX) }}</div>
          <div v-if="tile.isBomb && tile.isOpen">💣</div>
          <div v-if="tile.isFlag">🚩</div>
          <div v-else-if="!tile.isOpen"></div>
        </div>
      </template>
    </div>
    <dialog class="winText">
      <p>YOU WON</p>
      <button class="newGame" @click="startOpen = true"></button>
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
let difficulty: number;
const startOpen = ref(true);

//------------------------
function game() {
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
// setTimeout(
// checkArea(indexX, indexY)
//, 200)
function generateBomb() {
  for (const column of gameMap.value) {
    for (const tile of column) {
      if (column[Math.round(Math.random() * (height - 1))] !== undefined) {
        column[Math.round(Math.random() * (height - 1))].isBomb = true;
      }
    }
  }
  gameMap.value[Math.floor(width / 2)][Math.floor(height / 2)].isBomb = false;
  gameMap.value[Math.floor(width / 2)][Math.floor(height / 2 - 1)].isBomb = false;
  gameMap.value[Math.floor(width / 2)][Math.floor(height / 2 + 1)].isBomb = false;
  gameMap.value[Math.floor(width / 2 - 1)][Math.floor(height / 2)].isBomb = false;
  gameMap.value[Math.floor(width / 2 - 1)][Math.floor(height / 2 - 1)].isBomb = false;
  gameMap.value[Math.floor(width / 2 - 1)][Math.floor(height / 2 + 1)].isBomb = false;
  gameMap.value[Math.floor(width / 2 + 1)][Math.floor(height / 2)].isBomb = false;
  gameMap.value[Math.floor(width / 2 + 1)][Math.floor(height / 2 - 1)].isBomb = false;
  gameMap.value[Math.floor(width / 2 + 1)][Math.floor(height / 2 + 1)].isBomb = false;
}

function countBombs(y: number, x: number) {
  let numberOfBombs = 0;
  if (gameMap.value[y + 1]?.[x]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap.value[y - 1]?.[x]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap.value[y]?.[x + 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap.value[y]?.[x - 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap.value[y + 1]?.[x + 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap.value[y - 1]?.[x + 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap.value[y - 1]?.[x - 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap.value[y + 1]?.[x - 1]?.isBomb) {
    numberOfBombs++;
  }

  return numberOfBombs;
}

// function render() {
//   const gameField = document.querySelector('.field');
//   if (gameField !== null) {
//     gameField.innerHTML = '';
//   }
//   gameField?.setAttribute('style', `grid-template-columns: repeat(${width},1fr); width: ${50 * width}px;`);
//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       const tile = document.createElement('div');
//       tile.className = 'tile';
//       if (x === Math.floor(width / 2) && y === Math.floor(height / 2)) {
//         tile.setAttribute('isMiddle', 'middle');
//       }
//       tile.onclick = () => {
//         tileClick(x, y);
//       };
//       tile.oncontextmenu = e => {
//         e.preventDefault();
//         placeFlag(x, y);
//       };
//       gameField?.appendChild(tile);
//       if (gameMap.value[x][y].isOpen) {
//         tile.setAttribute('isOpen', 'open');
//         if (gameMap.value[x][y].isBomb) {
//           tile.innerHTML = '💣';
//         } else {
//           tile.innerHTML = `${countBombs(x, y)}`;
//           if (countBombs(x, y) === 0) {
//             setTimeout(() => {
//               checkArea(x, y);
//             }, 200);
//           }
//         }
//       } else if (!gameMap.value[x][y].isOpen) {
//         if (gameMap.value[x][y].isFlag) {
//           tile.innerHTML = '🚩';
//         } else {
//           tile.innerHTML = '';
//         }
//       }
//     }
//   }
// }

function tileClick(tile: Tile) {
  if (tile.isFlag) {
    return;
  }
  if (tile.isBomb) {
    lost();
  } else {
    if (!tile.isOpen) {
      tile.isOpen = true;
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

function lost() {
  gameMap.value = [];
  startOpen.value = true;
}

function checkWin() {
  if (gameMap.value.every(a => a.every(b => b.isOpen || b.isBomb))) {
    const winText = document.querySelector('.winText') as HTMLDialogElement;
    winText.showModal();
    game();
  }
}

function checkSize(currentSelectedSize: string) {
  if (currentSelectedSize) {
    if (currentSelectedSize === 'small') {
      width = 11;
      height = 9;
      difficulty = 2;
    } else if (currentSelectedSize === 'medium') {
      width = 23;
      height = 11;
      difficulty = 3;
    } else {
      width = 37;
      height = 13;
      difficulty = 5;
    }
  }
}
function checkArea(x: number, y: number) {
  if (!gameMap.value[x + 0]?.[y + 1]?.isOpen) {
    tileClick(x, y + 1);
  }
  if (!gameMap.value[x + 0]?.[y - 1]?.isOpen) {
    tileClick(x, y - 1);
  }
  if (!gameMap.value[x + 1]?.[y + 1]?.isOpen) {
    tileClick(x + 1, y + 1);
  }
  if (!gameMap.value[x + 1]?.[y - 1]?.isOpen) {
    tileClick(x + 1, y - 1);
  }
  if (!gameMap.value[x - 1]?.[y + 1]?.isOpen) {
    tileClick(x - 1, y + 1);
  }
  if (!gameMap.value[x - 1]?.[y - 1]?.isOpen) {
    tileClick(x - 1, y - 1);
  }
  if (!gameMap.value[x - 1]?.[y + 0]?.isOpen) {
    tileClick(x - 1, y);
  }
  if (!gameMap.value[x + 1]?.[y + 0]?.isOpen) {
    tileClick(x + 1, y);
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
  height: 100vh;
  width: 100vw;
  margin: 0;
  background-color: $white-color;
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

.tile[isOpen] {
  background-color: #d5b89a;
}
.tile[isOpen]:nth-child(even) {
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
