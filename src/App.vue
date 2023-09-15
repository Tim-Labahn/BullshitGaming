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
        <ul class="navbar-nav justify-content-between w-100">
          <div class="d-flex">
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
            <li class="nav-item">
              <a class="nav-link" href="#" @click="route = 'Tetris'">Tetris</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="route = 'Snake'">Snake</a>
            </li>
          </div>
          <li class="nav-item" v-if="loggedInUserEmail === undefined">
            <a class="nav-link" href="#" @click="route = 'Login'">Login</a>
          </li>
          <li class="nav-item" v-else-if="loggedInUserEmail !== undefined">
            <a class="nav-link" href="#" @click="loggedInUserEmail = undefined">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="d-flex justify-content-center align-items-center Game" style="height: calc(100vh - 56px)">
    <Login v-if="route === 'Login'"></Login>
    <Home v-if="route === 'Home'"></Home>
    <MathQuiz v-if="route === 'MathQuiz'"></MathQuiz>
    <ConnectFour v-if="route === 'ConnectFour'"></ConnectFour>
    <CookieClicker v-if="route === 'CookieClicker'"></CookieClicker>
    <TicTacToe v-if="route === 'TicTacToe'"></TicTacToe>
    <Minesweeper v-if="route === 'Minesweeper'"></Minesweeper>
    <Snake v-if="route === 'Snake'"></Snake>
    <!-- <div v-if="route === 'Tetris'">
        <Tetris></Tetris>
      </div> -->
  </div>
</template>

<script lang="ts" setup>
// import { ref } from 'vue';
// import Login from './components/Login.vue';
import Home from './components/Website/Home.vue';
import Login from './components/User/auth/Login.vue';
// import Tetris from './components/Games/Tetris/Tetris.vue';
import ConnectFour from './components/Games/ConnectFour.vue';
import CookieClicker from './components/Games/CookieClicker/cookieClicker.vue';
import TicTacToe from './components/Games/TicTacToe.vue';
import MathQuiz from './components/Games/MathQuiz.vue';
import Minesweeper from './components/Games/Minesweeper.vue';
import Snake from './components/Games/Snake.vue';
import { route } from './Route';
import { loggedInUserEmail } from './components/User/userInformation';
</script>

<style scoped></style>
