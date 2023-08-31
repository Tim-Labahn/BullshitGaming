<template>
  <header>
    <h1>Willkommen bei Bullshit Games</h1>
  </header>
  <section>
    <h2>Unsere Highlights:</h2>
    <ul>
      <li><s>Einzigartige Spiele</s></li>
      <li>Aktuelle "Bullshit"-Neuerscheinungen</li>
      <li><s>Verrückte Community</s></li>
      <li>Lachsgarantie</li>
    </ul>
  </section>
  <section>
    <h2>Warum Bullshit Games wählen?</h2>
    <ul>
      <li><s>Unsere Einzigartigkeit</s></li>
    </ul>
  </section>
  <section>
    <h2>Unsere Spiele:</h2>
    <div class="game">
      <h3>Spiel 1: Tic Tac Toe</h3>
      <p>Spiele eine runde TicTacToe gegen deine freunde. Und wenn du keine hast spiele einfach gegen dich selsbt und gewinne jede runde.</p>
      <button @click.prevent="route = 'TicTacToe'">Spiel starten</button>
    </div>
    <div class="game">
      <h3>Spiel 2: Cookie Clicker</h3>
      <p>Clicke bis die finger bluten und sammle alle Coockies. Jetzt neu, versklave deine oma um mit dir zu arbeiten.</p>
      <button @click.prevent="route = 'CookieClicker'">Spiel starten</button>
    </div>
  </section>
  <section>
    <h2>Community-Forum:</h2>
    <p>Trete unserer Community bei und tausche dich mit anderen Spielern aus. Stelle Fragen, teile Tipps und sei Teil unserer verrückten Welt!</p>
    <a href="forum.html">Zum Forum</a>
  </section>
  <footer>
    <p>
      Bullshit Games ist mehr als nur eine Spiele-Website; es ist ein verrückter, herzlicher Ort, an dem du dich ausleben und gleichzeitig entspannen
      kannst. Bist du bereit, den Unsinn zu erforschen? Starte noch heute und erlebe Spiele, die dich sprachlos machen!
    </p>
  </footer>
</template>

<script setup lang="ts">
import { route } from '../userInformation';
import TicTacToe from './TicTacToe.vue';
</script>
