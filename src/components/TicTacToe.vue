<template>
  <div class="tictactoe">
    <dialog class="GameStart" :open="openStart">
      <p>
        Click
        <button :class="'StartGame'" @click="(openStart = false), game()">Here</button>
        to start the game
      </p>
    </dialog>
    <dialog class="GameEnd" :open="openRestart">
      <p>
        Click
        <button class="btn btn-primary" :class="'RestartGame'" @click="(openRestart = false), game()">Here</button>
        to restart the game
      </p>
    </dialog>
    <div class="field">
      <div class="row" v-for="row in gameMap">
        <div
          class="tile"
          v-for="tile in row"
          @click="
            if (tile.isEmpty) {
              (tile.isEmpty = false), (tile.isCross = player), checkWinLose(), playerSwitch();
            }
          "
        >
          <div>{{ tile.isCross }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Tile = {
  isEmpty: boolean;
  isCross: string;
};

const gameSize = 3;
const gameMap = ref<Tile[][]>([]);
const openStart = ref(true);
const openRestart = ref(false);
const player = ref('✗');

function game() {
  player.value = '✗';
  generateField();
}

function checkWinLose() {
  const players = ['✗', '◯'];
  for (let i = 0; i < 3; i++) {
    for (const currentPlayer of players)
      if (
        (gameMap.value[i][0].isCross === currentPlayer &&
          gameMap.value[i][1].isCross === currentPlayer &&
          gameMap.value[i][2].isCross === currentPlayer) ||
        (gameMap.value[0][i].isCross === currentPlayer &&
          gameMap.value[1][i].isCross === currentPlayer &&
          gameMap.value[2][i].isCross === currentPlayer) ||
        (gameMap.value[0][0].isCross === currentPlayer &&
          gameMap.value[1][1].isCross === currentPlayer &&
          gameMap.value[2][2].isCross === currentPlayer) ||
        (gameMap.value[0][2].isCross === currentPlayer &&
          gameMap.value[1][1].isCross === currentPlayer &&
          gameMap.value[2][0].isCross === currentPlayer)
      ) {
        openRestart.value = true;
      } else if (
        !gameMap.value[0][0].isEmpty &&
        !gameMap.value[0][1].isEmpty &&
        !gameMap.value[0][2].isEmpty &&
        !gameMap.value[1][0].isEmpty &&
        !gameMap.value[1][1].isEmpty &&
        !gameMap.value[1][2].isEmpty &&
        !gameMap.value[2][0].isEmpty &&
        !gameMap.value[2][1].isEmpty &&
        !gameMap.value[2][2].isEmpty
      ) {
        openRestart.value = true;
      }
  }
}
function playerSwitch() {
  if (player.value === '✗') {
    player.value = '◯';
  } else {
    player.value = '✗';
  }
}

function generateField() {
  gameMap.value = [];
  for (let i = 0; i < gameSize; i++) {
    const rowY = [];
    for (let k = 0; k < gameSize; k++) {
      const tile = {
        isEmpty: true,
        isCross: '',
      };
      rowY.push(tile);
    }

    gameMap.value.push(rowY);
  }
}
</script>

<style scoped>
.tictactoe {
  height: 96vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(/gruene-schmutzige-tafel.jpg);
  width: 100vw;
  color: #ffffff;
}
.tile {
  font-weight: bold;
  border: 2px solid black;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  user-select: none;
}

.field {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 300px;
  justify-content: center;
  align-items: center;
  /* margin-right: 15.4%; */
}
dialog {
  background-color: #84a98c;
}
p {
  margin: 0;
}
button {
  background-color: #52796f;
  border-color: #84a98c;
}
button:hover {
  background-color: #354f52;
  border-color: #52796f;
}
.StartGame {
  height: 45px;
}
</style>
