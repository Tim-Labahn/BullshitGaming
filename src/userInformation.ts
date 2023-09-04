import { ref } from 'vue';

export type UserType = {
  ID: number;
  Passwort: string;
  Email: string;
};

export const loggedInUserID = ref<number | undefined>();
export const users = ref<UserType[]>([]);
export const route = ref('');
localStorage.setItem('LocalUserList', JSON.stringify(users.value));
