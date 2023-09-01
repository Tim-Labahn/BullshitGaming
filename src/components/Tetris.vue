<template>
  <div class="tetris">
    <button class="btn btn-primary" @click="spawnTetromine()">Start game</button>
    <div class="field d-flex justify-content-center align-items-center pt-5">
      <div v-for="x in 10">
        <div class="cells border border-dark" v-for="y in 20">
          <div v-if="gameMap[0][0]?.color === 'black'">Black</div>
          <div>White</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

type Blocktype = {
  color: string;
  rotation: number;
  positionX: number;
  positionY: number;
}[];
const TICKS_PER_SECOND = 24;
const gameMap = ref<Blocktype[] | null[]>([]);

function generateMap() {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
      gameMap.value.push(null);
    }
  }
}

function gameLoop() {
  blockMovement();
}
setInterval(gameLoop, 1000 / TICKS_PER_SECOND);

function blockMovement() {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
      gameMap.value[y][x].color = 'white';
    }
  }
}

function spawnTetromine() {
  gameMap.value[4][0].color = 'black';
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
