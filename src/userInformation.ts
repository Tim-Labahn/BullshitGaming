import { ref } from 'vue';

export type UserType = {
  ID: number;
  Name: string;
  Birthday: number;
  Gender: string;
  Passwort: string;
  Email: string;
};

export const logedInUserID = ref<number | undefined>();
export const users = ref<UserType[]>([]);
export const route = ref('Home');
localStorage.setItem('LocalUserList', JSON.stringify(users.value));
