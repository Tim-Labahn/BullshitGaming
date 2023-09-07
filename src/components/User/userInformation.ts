import { ref } from 'vue';

export type UserType = {
  ID: number;
  PasswortHash: string;
  Email: string;
};

export const loggedInUserID = ref<number | undefined>();
export const users = ref<UserType[]>([]);
localStorage.setItem('LocalUserList', JSON.stringify(users.value));
