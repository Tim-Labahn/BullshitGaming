<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="card">
      <div class="card-header">login</div>
      <div class="card-body d-flex justify-content-center align-items-center flex-column">
        <h1>BullShit Games</h1>
        <div v-if="loginStep === 0">
          <h3>Anmelden</h3>
          <form name="Login" @submit.prevent="checkIfExist()">
            <div>
              <input v-model="userLoginEmail" id="Name" type="email" placeholder="E-Mail" required />
            </div>
            <div>
              <input v-model="userLoginPassword" type="password" placeholder="Passwort" required />
            </div>
            <button class="btn btn-dark">Weiter</button>
          </form>
          <a role="button" class="registerLink text-dark" @click="loginStep = 1">Neuen Account erstellen</a>
        </div>
        <div name="Register step 1" v-if="loginStep === 1" class="d-flex justify-content-center align-items-center flex-column">
          <h3>Bullshit Gaming-Konto erstellen</h3>
          <form @submit.prevent="createUser(), (loggedInUserID = newUserID), (loginStep = 0)">
            <div>
              <input v-model="newUserEmail" id="Name" type="email" placeholder="E-Mail" required />
            </div>
            <div>
              <input v-model="newUserPasswort" type="password" placeholder="Passwort" required />
            </div>
            <div class="d-flex justify-content-end"><button class="btn btn-dark">Registrieren</button></div>
          </form>
        </div>
        <div v-if="loginStep === 2">
          <h3>Angemeldet</h3>
          <button class="btn btn-dark" @click="route = 'Home'">Zur Homepage</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { users, loggedInUserID, UserType } from './userInformation';
import { route } from '../../Route';

import bcrypt from 'bcryptjs';

const loginStep = ref(0);
const userLoginEmail = ref('');
const userLoginPassword = ref('');

const newUserID = ref(+Math.random().toString().substring(2));
const newUserPasswort = ref('');
const newUserEmail = ref('');

function createUser() {
  loadUserData();
  users.value.push({
    ID: newUserID.value,
    PasswortHash: bcrypt.hashSync(newUserPasswort.value, 8) ?? '',
    Email: newUserEmail.value ?? '',
  });
  setLocalStorage();
}
function checkIfExist() {
  loadUserData();
  if (users.value.find(user => user.Email.toLowerCase() === userLoginEmail.value.toLowerCase())) {
    // return true;

    if (
      bcrypt.compareSync(
        userLoginPassword.value,
        users.value.find(user => user.Email.toLowerCase() === userLoginEmail.value.toLowerCase())?.PasswortHash ?? ''
      )
    ) {
      loggedInUserID.value = users.value.find(user => user.Email.toLowerCase() === userLoginEmail.value.toLowerCase())?.ID;
      loginStep.value = 2;
    }
  }
  setLocalStorage();
}

function loadUserData() {
  if (localStorage.getItem('Users') !== null) {
    users.value = JSON.parse(localStorage.getItem('Users') ?? '[]');
  }
  setLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem('Users', JSON.stringify(users.value));
}

const loggedInUserData = ref<UserType>();
if (users) {
  loggedInUserData.value = users.value.find(user => user.ID === loggedInUserID.value);
}
</script>
<style lang="scss" scoped>
.registerLink {
  text-decoration: none;
}
.registerLink:hover {
  text-decoration: underline;
}
</style>
