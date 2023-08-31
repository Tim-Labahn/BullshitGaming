<template>
  <h1 class="d-flex justify-content-center align-items-center header">Math Quiz</h1>
  <h3 class="d-flex justify-content-center align-items-center">Try to go as far as you can!</h3>
  <h1 class="d-flex justify-content-center align-items-center">
    {{ questions[questionCount].question }}
  </h1>
  <div class="textWrapper">
    <h3>Question: {{ questionCount + 1 }}</h3>
    <div>
      <h3>Questions correct: {{ correctQuestionsCount }}</h3>
      <h3>Questions wrong: {{ wrongQuestionsCount }}</h3>
    </div>
  </div>
  <div class="questionWrapper">
    <div
      v-for="answer in questions[questionCount].answers"
      @click="
        answerClick(answer);
        clicked = answer;
      "
      class="d-flex justify-content-center align-items-center answerWrapper"
      :class="
        // clicked === questions[questionCount].correctAnswer && answer === clicked
        //   ? 'bg-success'
        //   : ''
        changeAnswerBackground(answer)
      "
    >
      {{ answer }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const clicked = ref<null | number>(null);
const correctColor = ref('');
const wrongColor = ref('');
const questionCount = ref(0);
const correctQuestionsCount = ref(0);
const wrongQuestionsCount = ref(0);
const questions = ref<
  {
    question: string;
    correctAnswer: number;
    answers: number[];
  }[]
>([]);

function answerClick(answer: number) {
  setTimeout(() => {
    if (answer === questions.value[questionCount.value].correctAnswer) {
      correctQuestionsCount.value++;
      correctColor.value = 'correctColor';
    } else {
      wrongQuestionsCount.value++;
      wrongColor.value = 'wrongColor';
    }
    questionCount.value++;
    clicked.value = null;
    generateQuestion();
  }, 1000);
}

function placeCorrectAnswerPosition() {
  questions.value[questionCount.value].answers.splice(Math.floor(Math.random() * 4), 1, questions.value[questionCount.value].correctAnswer);
}

function changeAnswerBackground(answer: number) {
  if (clicked.value !== questions.value[questionCount.value].correctAnswer && answer === clicked.value) {
    return 'bg-danger';
  }
  if (clicked.value !== null && answer === questions.value[questionCount.value].correctAnswer) {
    return 'bg-success';
  }

  return '';
}

generateQuestion();
function generateQuestion() {
  const questionStructure = Math.random();
  const numberOne = Math.ceil(Math.random() * 100);
  const numberTwo = Math.ceil(Math.random() * 100);
  const numberThree = Math.ceil(Math.random() * 100);
  if (questionStructure <= 25) {
    questions.value.push({
      question: `${numberOne} + ${numberTwo} * ${numberThree}`,
      answers: [
        numberOne * (numberTwo - numberOne) * numberThree,
        numberOne * (numberTwo + numberThree),
        numberOne - numberTwo * numberThree,
        numberOne * (numberTwo - numberThree),
      ],
      correctAnswer: numberOne + numberTwo * numberThree,
    });
    questions.value[questionCount.value].question = `${numberOne} + ${numberTwo} * ${numberThree}`;
  } else if (questionStructure <= 50 && questionStructure >= 25) {
    questions.value.push({
      question: `${numberOne} * (${numberTwo} + ${numberThree})`,
      answers: [
        numberOne - numberTwo * numberThree,
        numberOne + numberTwo * numberThree,
        numberOne + numberTwo ** 2 - numberThree,
        numberOne * (numberTwo - numberThree),
      ],
      correctAnswer: numberOne * (numberTwo + numberThree),
    });
  } else if (questionStructure <= 75 && questionStructure >= 50) {
    questions.value.push({
      question: `${numberOne} - ${numberTwo} * ${numberThree}`,
      answers: [
        numberOne * (numberTwo + numberThree),
        numberOne * (numberTwo - numberThree),
        numberOne + numberTwo * numberThree,
        numberTwo * numberThree,
      ],
      correctAnswer: numberOne - numberTwo * numberThree,
    });
  } else {
    questions.value.push({
      question: `${numberOne} * (${numberTwo} - ${numberThree})`,
      answers: [
        numberOne - numberTwo * numberThree,
        numberTwo - numberThree * numberOne + 3,
        numberOne + numberTwo * numberThree,
        numberOne * (numberTwo + numberThree),
      ],
      correctAnswer: numberOne * (numberTwo - numberThree),
    });
  }
  placeCorrectAnswerPosition();
}
</script>
<style scoped lang="scss">
/* Cool infinite background scrolling animation.
 * Twitter: @kootoopas
 */
/* Exo thin font from Google. */
@import url(https://fonts.googleapis.com/css?family=Exo:100);
/* Background data (Original source: https://subtlepatterns.com/grid-me/) */
/* Animations */
@-webkit-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-moz-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-o-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-webkit-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@-moz-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@-o-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
/* Main styles */
body {
  background-size: 100% 100%;
  background-position: 0px 0px;
  background-image: linear-gradient(90deg, #212d19ff 0%, #40862eff 50%, #212d19ff 100%);
  height: 100vh;
  color: black;
  font: 400 16px/1.5 exo, ubuntu, 'segoe ui', helvetica, arial, sans-serif;
  text-align: center;
  /* img size is 50x50 */
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC')
    repeat 0 0;
  -webkit-animation: bg-scrolling-reverse 0.92s infinite;
  /* Safari 4+ */
  -moz-animation: bg-scrolling-reverse 0.92s infinite;
  /* Fx 5+ */
  -o-animation: bg-scrolling-reverse 0.92s infinite;
  /* Opera 12+ */
  animation: bg-scrolling-reverse 0.92s infinite;
  /* IE 10+ */
  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
  -o-animation-timing-function: linear;
  animation-timing-function: linear;
}
body::before {
  font-size: 8rem;
  font-weight: 100;
  font-style: normal;
}
.questionWrapper {
  display: grid;
  margin-inline: auto;
  margin-bottom: 25%;
  grid-template-columns: repeat(2, 1fr);
  width: 70vw;
  height: 40vh;
  color: black;
  gap: 3px;
}
.answerWrapper {
  background-color: rgba(128, 128, 128, 0.4);
  font-size: 36px;
  font-weight: bold;
}

h1,
h3 {
  color: black;
  font-weight: bold;
}

.header {
  padding-top: 15%;
}

.textWrapper {
  display: flex;
  justify-content: space-evenly;
}
</style>
