<template>
  <h1>Minesweeper</h1>
  <h4>PLACE FLAGS WITH RIGHT CLICK</h4>
  <div class="Minesweeper">
    <dialog :open="startOpen">
      <form @submit.prevent="(startOpen = false), checkSize(selectedSize), game(), console.log('size was picked')">
        <p>Pick the Map Size!</p>
        <select name="map-größen" id="map-größen" v-model="selectedSize">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        <button type="submit" class="pickSize">Submit</button>
      </form>
    </dialog>
    <div class="field">
      <div class="tile" v-for="y in width">
        <div class="tile" v-for="x in height">
          <div v-if="gameMap[x][y].isOpen">{{ countBombs(y, x) }}</div>
          <div v-if="gameMap[x][y].isBomb">💣</div>
          <div v-if="gameMap[x][y].isFlag">🚩</div>
          <div v-else="!gameMap[x][y].isOpen"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const selectedSize = ref<string>('small');
type GameMap = {
  isBomb: boolean;
  isFlag: boolean;
  isOpen: boolean;
}[][];
let gameMap: GameMap = [];
let width: number;
let height: number;
let difficulty: number;
const startOpen = ref<boolean>(true);

//------------------------
function game() {
  gameMap = [];
  generateField();
  generateBomb();
  render();
}
function generateField() {
  for (let i = 0; i < width; i++) {
    const rowY = [];
    for (let k = 0; k < height; k++) {
      const field = {
        isBomb: false,
        isFlag: false,
        isOpen: false,
      };
      const rowX = field;
      rowY.push(rowX);
    }

    gameMap.push(rowY);
  }
}

function generateBomb() {
  for (let i = 0; i < width; i++) {
    for (let k = 0; k < difficulty; k++) {
      gameMap[i][Math.round(Math.random() * (height - 1))].isBomb = true;
    }
  }
  gameMap[Math.floor(width / 2)][Math.floor(height / 2)].isBomb = false;
  gameMap[Math.floor(width / 2)][Math.floor(height / 2 - 1)].isBomb = false;
  gameMap[Math.floor(width / 2)][Math.floor(height / 2 + 1)].isBomb = false;
  gameMap[Math.floor(width / 2 - 1)][Math.floor(height / 2)].isBomb = false;
  gameMap[Math.floor(width / 2 - 1)][Math.floor(height / 2 - 1)].isBomb = false;
  gameMap[Math.floor(width / 2 - 1)][Math.floor(height / 2 + 1)].isBomb = false;
  gameMap[Math.floor(width / 2 + 1)][Math.floor(height / 2)].isBomb = false;
  gameMap[Math.floor(width / 2 + 1)][Math.floor(height / 2 - 1)].isBomb = false;
  gameMap[Math.floor(width / 2 + 1)][Math.floor(height / 2 + 1)].isBomb = false;
}

function countBombs(y: number, x: number) {
  let numberOfBombs = 0;
  if (gameMap[y + 1]?.[x]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap[y - 1]?.[x]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap[y]?.[x + 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap[y]?.[x - 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap[y + 1]?.[x + 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap[y - 1]?.[x + 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap[y - 1]?.[x - 1]?.isBomb) {
    numberOfBombs++;
  }
  if (gameMap[y + 1]?.[x - 1]?.isBomb) {
    numberOfBombs++;
  }

  return numberOfBombs;
}

function render() {
  const gameField = document.querySelector('.field');
  if (gameField !== null) {
    gameField.innerHTML = '';
  }
  gameField?.setAttribute('style', `grid-template-columns: repeat(${width},1fr); width: ${50 * width}px;`);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      if (x === Math.floor(width / 2) && y === Math.floor(height / 2)) {
        tile.setAttribute('isMiddle', 'middle');
      }
      tile.onclick = () => {
        tileClick(x, y);
      };
      tile.oncontextmenu = e => {
        e.preventDefault();
        placeFlag(x, y);
      };
      gameField?.appendChild(tile);
      if (gameMap[x][y].isOpen) {
        tile.setAttribute('isOpen', 'open');
        if (gameMap[x][y].isBomb) {
          tile.innerHTML = '💣';
        } else {
          tile.innerHTML = `${countBombs(x, y)}`;
          if (countBombs(x, y) === 0) {
            setTimeout(() => {
              checkArea(x, y);
            }, 200);
          }
        }
      } else if (!gameMap[x][y].isOpen) {
        if (gameMap[x][y].isFlag) {
          tile.innerHTML = '🚩';
        } else {
          tile.innerHTML = '';
        }
      }
    }
  }
}

function tileClick(yIndex: number, xIndex: number) {
  if (gameMap[yIndex][xIndex].isFlag) {
    return;
  }
  if (gameMap[yIndex][xIndex].isBomb) {
    lost(yIndex, xIndex);
  } else {
    if (!gameMap[yIndex][xIndex].isOpen) {
      gameMap[yIndex][xIndex].isOpen = true;
      render();
    }
  }
  checkWin();
}

function placeFlag(yIndex: number, xIndex: number) {
  if (!gameMap[yIndex][xIndex].isFlag) {
    gameMap[yIndex][xIndex].isFlag = true;
  } else {
    gameMap[yIndex][xIndex].isFlag = false;
  }
  render();
}

function lost(yIndex: number, xIndex: number) {
  if (gameMap[yIndex][xIndex].isBomb) {
    game();
    const dialog = document.querySelector('dialog');
    if (dialog) {
      dialog.showModal();
    }
  }
}

function checkWin() {
  if (gameMap.every(a => a.every(b => b.isOpen || b.isBomb))) {
    const winText = document.querySelector('.winText') as HTMLDialogElement;
    winText.showModal();
    game();
  }
}

function checkSize(gameMapSize: string) {
  if (gameMapSize) {
    if (gameMapSize === 'small') {
      width = 11;
      height = 9;
      difficulty = 2;
    } else if (gameMapSize === 'medium') {
      width = 23;
      height = 11;
      difficulty = 3;
    } else {
      width = 37;
      height = 15;
      difficulty = 5;
    }
  }
}
function checkArea(x: number, y: number) {
  if (!gameMap[x + 0]?.[y + 1]?.isOpen) {
    tileClick(x, y + 1);
  }
  if (!gameMap[x + 0]?.[y - 1]?.isOpen) {
    tileClick(x, y - 1);
  }
  if (!gameMap[x + 1]?.[y + 1]?.isOpen) {
    tileClick(x + 1, y + 1);
  }
  if (!gameMap[x + 1]?.[y - 1]?.isOpen) {
    tileClick(x + 1, y - 1);
  }
  if (!gameMap[x - 1]?.[y + 1]?.isOpen) {
    tileClick(x - 1, y + 1);
  }
  if (!gameMap[x - 1]?.[y - 1]?.isOpen) {
    tileClick(x - 1, y - 1);
  }
  if (!gameMap[x - 1]?.[y + 0]?.isOpen) {
    tileClick(x - 1, y);
  }
  if (!gameMap[x + 1]?.[y + 0]?.isOpen) {
    tileClick(x + 1, y);
  }
}
</script>
<style scoped lang="scss">
:root {
  --white-color: #f0ead2;
  --primary-color: #adc178;
  --secondary-color-darkened: #7a6455;
  --secondary-color: #a98467;
  --primary-color-lightened: #dbe4b0;
}
.Minesweeper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: var(--white-color);
}

.field {
  display: grid;
  background-color: var(--primary-color);
}
.tile:nth-child(even) {
  background-color: var(--primary-color-lightened);
}

h1 {
  font-size: 8vh;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 0;
  color: var(--secondary-color-darkened);
}
h4 {
  margin-top: 5px;
  color: var(--secondary-color-darkened);
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
  width: 15vh;
  align-items: center;
  background-color: var(--white-color);
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
