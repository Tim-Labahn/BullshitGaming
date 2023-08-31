<template>
  <div
    style="
      border: 1px solid #213547;
      background-color: whitesmoke;
      border-radius: 30px;
      text-align: center;
      width: 500px;
      height: 400px;
      font-size: larger;
    "
  >
    <h1>BullShit Gaming</h1>
    <div v-if="loginStep === 0">
      <h3>Anmelden</h3>
      <p>Bitte ihre Email und password angeben</p>
      <form name="Login" @submit.prevent="checkIfExist()">
        <div>
          <input v-model="userLoginEmail" id="Name" type="email" placeholder="Email" required />
        </div>
        <div>
          <input v-model="userLoginPassword" type="password" placeholder="Password" required />
        </div>
        <button type="submit">Weiter</button>
      </form>
      <button @click="loginStep = 1">Neuen Account erstellen</button>
    </div>
    <div name="Register step 1" v-if="loginStep === 1">
      <h3>Bullshit Gaming-Konto ersellen</h3>
      <p>Bitte den Namen eingeben</p>
      <form @submit.prevent="loginStep = 2">
        <div>
          <input v-model="newuserName" id="Name" type="text" placeholder="Vorname" required />
        </div>
        <div>
          <input v-model="newuserLastName" type="text" placeholder="Nachname" required />
        </div>
        <button type="submit">Weiter</button>
      </form>
    </div>
    <div name="Register step 2" v-if="loginStep === 2">
      <h3>Allgemeine Informationen</h3>
      <p>Geben Sie ihr Geburtsdatum und ihr geschlecht ein.</p>
      <form @submit.prevent="loginStep = 3">
        <div>
          <input
            type="date"
            style="width: 250px; border-radius: 5px; background-color: whitesmoke; letter-spacing: 4px; text-align: center"
            v-model="newuserBirthDay"
          />
        </div>
        <div>
          <select v-model="newuserGender" id="gender" required>
            <option value="">Geschlecht</option>
            <option value="Male">Mänlich</option>
            <option value="Female">Weiblich</option>
            <option value="Divers">Divers</option>
          </select>
        </div>
        <button type="submit">Weiter</button>
      </form>
    </div>
    <div name="Register step 3" v-if="loginStep === 3">
      <form @submit.prevent="loginStep = 4">
        <h3>Starkes Passwort erstllen</h3>
        <p>Bitte ein starkes password aus buchstaben, Zahlen und sonderzeichen erstllen</p>
        <div>
          <input v-model="newuserPasswort" id="Password" type="password" placeholder="Password" minlength="8" maxlength="20" required />
        </div>
        <div>
          <input type="password" placeholder="Bestätiigen" required :pattern="newuserPasswort" />
        </div>
        <button type="submit">Weiter</button>
      </form>
    </div>
    <div name="Register step 4" v-if="loginStep === 4">
      <form @submit.prevent="loginStep = 5">
        <h3>Telefonnummer</h3>
        <p>Bestätigungscode an Ihr Smartphone senden</p>
        <div>
          <input v-model="newuserNummer" id="Number" type="number" placeholder="Telefonnummer" minlength="10" maxlength="16" required />
          <!-- <span id="errorMessage"></span> -->
        </div>
        <button type="submit">Weiter</button>
      </form>
    </div>
    <div name="Register step 5" v-if="loginStep === 5">
      <form @submit.prevent="createUser(), (logedInUserID = newuserID), (loginStep = 6)">
        <h3>E-Mail</h3>
        <p>Bitte bestätigen sie ihre Email</p>
        <div>
          <input v-model="newuserEMail" id="newuserEMail" type="email" placeholder="E-Mail" required />
        </div>
        <button type="submit">Weiter</button>
      </form>
    </div>
    <div v-if="loginStep === 6">
      <h3>Angemeldet</h3>
      <p>Sie sind nun angemeldet, und können diese seite verlassen</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { users, logedInUserID } from '../userInformation';

const loginStep = ref(0);
// const date = ref(new Date());
const userLoginEmail = ref('');
const userLoginPassword = ref('');

const newuserID = ref(+Math.random().toString().substring(2));
const newuserName = ref('');
const newuserLastName = ref('');
const newuserBirthDay = ref<number>(0);
const newuserGender = ref('');
const newuserPasswort = ref('');
const newuserNummer = ref<number>(0);
const newuserEMail = ref('');

function createUser() {
  loadUserData();
  users.value.push({
    ID: newuserID.value,
    Name: newuserName.value + ' ' + newuserLastName.value,
    Birthday: newuserBirthDay.value,
    Gender: newuserGender.value,
    Passwort: newuserPasswort.value ?? '',
    Email: newuserEMail.value ?? '',
  });
  setLocalStorage();
}
function checkIfExist() {
  loadUserData();
  if (users.value.find(user => user.Email.toLowerCase() === userLoginEmail.value.toLowerCase())) {
    // return true;
    if (users.value.find(user => user.Email.toLowerCase() === userLoginEmail.value.toLowerCase())?.Passwort === userLoginPassword.value) {
      logedInUserID.value = users.value.find(user => user.Email.toLowerCase() === userLoginEmail.value.toLowerCase())?.ID;
      loginStep.value = 6;
    } else {
    }
  } else {
  }
  setLocalStorage();
}

function loadUserData() {
  if (localStorage.getItem('Users') !== null) {
    users.value = JSON.parse(localStorage.getItem('Users')!);
  }
  setLocalStorage();
}

function setLocalStorage() {
  localStorage.setItem('Users', JSON.stringify(users.value));
}

import { UserType } from '../userInformation';

let logedInUserData = ref<UserType>();
if (users) {
  logedInUserData.value = users.value.find(user => user.ID === logedInUserID.value);
}
</script>
../Information../Information
