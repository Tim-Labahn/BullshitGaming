<template>
  <div class="w-100">
    <div id="carouselExampleIndicators" class="carousel slide w-100" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
      </div>
      <div class="carousel-inner" style="width: 100%; height: 100%">
        <div class="carousel-item active">
          <img src="/tictactoe.png" class="d-block w-100" alt="..." @click="route = 'TicTacToe'" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Tic Tac Toe</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="/cookieClicker.png" class="d-block w-100" alt="..." @click="route = 'CookieClicker'" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Cookie Clicker</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="/connectFour.png" class="d-block w-100" alt="..." @click="route = 'ConnectFour'" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Connect Four</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="/mathQuiz.png" class="d-block w-100" alt="..." @click="route = 'MathQuiz'" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Math Quiz</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="/minesweeper.png" class="d-block w-100" alt="..." @click="route = 'Minesweeper'" />
          <div class="carousel-caption d-none d-md-block">
            <h5>Minesweeper</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="/connectFour.png" class="d-block w-100" alt="..." />
          <div class="carousel-caption d-none d-md-block">
            <h5>Tetris</h5>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { route } from '../../Route';
import TicTacToe from './TicTacToe.vue';
</script>
<style scoped lang="scss">
img {
  height: 800px;
  width: 300px;
}
</style>
