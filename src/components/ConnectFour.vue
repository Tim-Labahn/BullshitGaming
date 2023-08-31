<template>
  <div class="Body">
    <div class="Game">
      <div class="field">
        <div class="row" v-for="(row, index) in gameMap">
          <div
            class="tile"
            v-for="tile in row"
            @click.prevent="
              if (!win) {
                if (tile.isEmpty) {
                  tileClick(index), checkWin();
                }
              }
            "
          >
            <div v-if="tile.player && !tile.isEmpty">🔴</div>
            <div v-if="!tile.player && !tile.isEmpty">🔵</div>
          </div>
        </div>
      </div>
    </div>

    <dialog class="GameEnd" :open="openRestart">
      <p>
        Click
        <button
          :class="'RestartGame'"
          @click="
            gameMap = [];
            createMap();
            openRestart = false;
            win = false;
            player = true;
          "
        >
          Here
        </button>
        to restart the game
      </p>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const openStart = ref(true);
const openRestart = ref(false);
//--------------
let player = true;
let win = false;
let gameSize = 7;
const gameMap = ref<Tile[][]>([]);
type Tile = {
  isEmpty: boolean;
  player: boolean;
};
//---------------
createMap();

//---------------

function createMap() {
  for (let x = 0; x < gameSize; x++) {
    const rowY = [];
    for (let y = 0; y < gameSize; y++) {
      const tile = {
        isEmpty: true,
        player: false,
      };
      rowY.push(tile);
    }
    gameMap.value.push(rowY);
  }
}

function changePlayer() {
  player = !player;
}

function tileClick(x: number) {
  let y = -1;
  for (let i = gameSize - 1; i >= 0; i--) {
    if (gameMap.value[x][i].isEmpty) {
      y = i;
      break;
    }
  }
  if (y !== -1) {
    gameMap.value[x][y].player = player;
    gameMap.value[x][y].isEmpty = false;
  }
  checkWin();
  changePlayer();
}

function checkWin() {
  checkHorizontal();
  checkVertical();
  checkDiagonal();
  if (win) {
    openRestart.value = true;
  }
}
function showWinner() {
  const winText = document.querySelector('.winText') as HTMLDialogElement;
  winText.showModal();
}

function checkHorizontal() {
  let BChips = 0;
  let RChips = 0;
  for (let y = gameSize - 1; y >= 0; y--) {
    BChips = 0;
    RChips = 0;
    for (let i = gameSize - 1; i >= 0; i--) {
      if (gameMap.value[i][y]?.player && !gameMap.value[i][y]?.isEmpty) {
        RChips++;
        BChips = 0;
        checkChips(RChips);
      }
      if (!gameMap.value[i][y]?.player && !gameMap.value[i][y]?.isEmpty) {
        BChips++;
        RChips = 0;
        checkChips(BChips);
      }
      if (gameMap.value[i][y]?.isEmpty) {
        BChips = 0;
        RChips = 0;
      }
    }
  }
}

function checkVertical() {
  let BChips = 0;
  let RChips = 0;
  for (let x = gameSize - 1; x >= 0; x--) {
    BChips = 0;
    RChips = 0;
    for (let i = gameSize - 1; i >= 0; i--) {
      if (gameMap.value[x][i]?.player && !gameMap.value[x][i]?.isEmpty) {
        RChips++;
        BChips = 0;
        checkChips(RChips);
      }
      if (!gameMap.value[x][i]?.player && !gameMap.value[x][i]?.isEmpty) {
        BChips++;
        RChips = 0;
        checkChips(BChips);
      }
      if (gameMap.value[x][i]?.isEmpty) {
        BChips = 0;
        RChips = 0;
      }
    }
  }
}

function checkDiagonal() {
  for (let i = 2; i >= 0; i--) {
    for (let y = gameSize - 1; y > 0; y--) {
      for (let x = gameSize - 1; x > 0; x--) {
        if (
          gameMap.value[y][x].player === player &&
          !gameMap.value[y][x].isEmpty &&
          gameMap.value[y - 1]?.[x - 1]?.player === player &&
          !gameMap.value[y - 1]?.[x - 1]?.isEmpty &&
          gameMap.value[y - 2]?.[x - 2]?.player === player &&
          !gameMap.value[y - 2]?.[x - 2]?.isEmpty &&
          gameMap.value[y - 3]?.[x - 3]?.player === player &&
          !gameMap.value[y - 3]?.[x - 3]?.isEmpty
        ) {
          showWinner();
        }
        if (
          gameMap.value[y][x].player === player &&
          !gameMap.value[y][x].isEmpty &&
          gameMap.value[y - 1]?.[x + 1]?.player === player &&
          !gameMap.value[y - 1]?.[x + 1]?.isEmpty &&
          gameMap.value[y - 2]?.[x + 2]?.player === player &&
          !gameMap.value[y - 2]?.[x + 2]?.isEmpty &&
          gameMap.value[y - 3]?.[x + 3]?.player === player &&
          !gameMap.value[y - 3]?.[x + 3]?.isEmpty
        ) {
          showWinner();
        }
      }
    }
  }
}

function checkChips(c: number) {
  if (c >= 4) {
    win = true;
  }
}
</script>

<style scoped>
.Body {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 90vh;
}

.tile {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000000;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  color: #000000;
  font-size: 60px;
  user-select: none;
  transform: rotate(270deg) scaleY(-1) rotate(180deg);
}

.field {
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 700px;
  transform: rotate(180deg) scaleY(-1);
}

.StartGame {
  height: 45px;
}
</style>
