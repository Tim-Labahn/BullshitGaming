<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Bullshit Games</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#" @click="route = 'Home'">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="route = 'TicTacToe'">TicTacToe</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="route = 'CookieClicker'">Cookie Clicker</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="route = 'ConnectFour'">Connect Four</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="route = 'MathQuiz'">Math Quiz</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click="route = 'Minesweeper'">Minesweeper</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="d-flex justify-content-center align-items-center">
    <div class="Game" style="height: 90%">
      <div v-if="route === 'Home'">
        <Home></Home>
      </div>
      <div v-if="route === 'Minesweeper'">
        <Minesweeper></Minesweeper>
      </div>
      <div v-if="route === 'MathQuiz'">
        <MathQuiz></MathQuiz>
      </div>
      <div v-if="route === 'ConnectFour'">
        <ConnectFour></ConnectFour>
      </div>
      <div v-if="route === 'CookieClicker'">
        <CookieClicker></CookieClicker>
      </div>
      <div v-if="route === 'TicTacToe'">
        <TicTacToe></TicTacToe>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
// import Login from './components/Login.vue';
import Home from './components/Home.vue';

// import Tetris from './components/Tetris.vue';
import ConnectFour from './components/ConnectFour.vue';
import CookieClicker from './components/cookieClicker.vue';
import TicTacToe from './components/TicTacToe.vue';
import MathQuiz from './components/MathQuiz.vue';

import { route } from './userInformation';
</script>

<style scoped></style>
