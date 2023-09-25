<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="card">
      <div class="card-header">login</div>
      <div class="card-body d-flex justify-content-center align-items-center flex-column">
        <h1>BullShit Games</h1>
        <div name="Register step 1" v-if="Step === 1" class="d-flex justify-content-center align-items-center flex-column">
          <h3>Bullshit Gaming-Konto erstellen</h3>
          <form
            @submit.prevent="
              API.register(newUserName, newUserEmail, newUserPasswort), (loggedInUserId = newUserId), (loginStep = 0), (route = 'Home')
            "
          >
            <div>
              <input v-model="newUserEmail" id="Email" type="email" placeholder="E-Mail" required />
            </div>
            <div>
              <input v-model="newUserName" id="Name" type="text" placeholder="Name" required />
            </div>
            <div>
              <input v-model="newUserPasswort" type="password" placeholder="Passwort" required minlength="6" />
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
import { users, loggedInUserId, UserType } from '.././userInformation';
import { route } from '../../../Route';
import * as API from '../../.././API';
const loginStep = ref(0);
const userLoginEmail = ref('');
const userLoginPassword = ref('');
const newUserPasswort = ref('');
const newUserEmail = ref('');
const newUserName = ref('');
const newUserId = ref('');

const loggedInUserData = ref<UserType>();

async function register() {
  await API.register(newUserName, newUserEmail, newUserPasswort);
  route.value = 'Home';
}

async function login() {
  try {
    await API.login(userLoginEmail.value, userLoginPassword.value);
    route.value = 'Home';
  } catch {
    console.log('could not log in');
  }
}

if (users) {
  loggedInUserData.value = users.value.find(user => user.id === loggedInUserId.value);
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
