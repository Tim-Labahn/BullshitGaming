<template>
  <div class="tetris">
    <div class="field d-flex justify-content-center align-items-center pt-5">
      <div v-for="x in 10">
        <div class="cells border border-dark" v-for="y in 20"></div>
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
};

const gameMap = ref<Blocktype[]>([]);
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
