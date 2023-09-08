import { ref } from 'vue';

export type UserType = {
  id: number;
  email: string;
  player?: { cookiesInTotal: number; cookies: number; clickValue: number; passiveClicks: number };
  upgrades?: {
    clickUpgradeLevel: number;
    grandmaUpgradeLevel: number;
  };
  passwortHash: string;
};

export const loggedInUserEmail = ref<string | undefined>();
export const users = ref<UserType[]>([]);
localStorage.setItem('LocalUserList', JSON.stringify(users.value));
