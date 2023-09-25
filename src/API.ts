import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ref } from 'vue';
export const user = ref<any>(null);

const firebaseConfig = {
  apiKey: 'AIzaSyAVdmIU_aiT9NwsUekPpXrP6wYK25Ym8OM',
  authDomain: 'bullshitgaming.firebaseapp.com',
  projectId: 'bullshitgaming',
  storageBucket: 'bullshitgaming.appspot.com',
  messagingSenderId: '157171707389',
  appId: '1:157171707389:web:49223888b76c48d13b7d94',
  measurementId: 'G-8DNDMEQBEV',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//data
export async function getUserDataList() {
  const querySnapshot = await getDocs(collection(db, 'CookieClicker'));
  return querySnapshot.docs
    .map(item => ({
      ...(item.data() as {
        userData: {
          name: string;
          role: 'user';
          eMail: string;
        };
        cookieClickerData: {
          upgradeData: {
            clickUpgradeLevel: 1;
            grandmaUpgradeLevel: 1;
          };
          playerData: { cookiesInTotal: 0; cookies: 0; clickValue: 1; passiveClicks: 0 };
        };
      }),
      id: item.id,
    }))
    .sort(function (a, b) {
      return a.id.localeCompare(b.id);
    });
}

export async function updateItem(itemID: string, itemData: string, collectionName: string) {
  await updateDoc(doc(db, collectionName, itemID), {
    name: itemData,
  });
}

export async function addItem(itemData: string, collectionName: string) {
  await addDoc(collection(db, collectionName), {
    name: itemData,
  });
}

export async function deleteItem(itemID: string, collectionName: string) {
  await deleteDoc(doc(db, collectionName, itemID));
}
//login
export async function login(email: string, password: string): Promise<void> {
  console.log('login start');
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
  console.log('await callback');
  getCurrentUser();
  console.log('get current user :', getCurrentUser());
}

export async function logout(): Promise<void> {
  const auth = getAuth();
  await signOut(auth);
  getCurrentUser();
  window.location.reload();
}
export async function register(name: string, email: string, password: string): Promise<boolean> {
  const userList = await getUserDataList();
  if (!userList.filter(e => e.userData.eMail === email)) {
    console.log('test');
    return false;
  } else {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(getFirestore(), 'users', userCredential.user.uid), {
        userData: {
          id: userCredential.user.uid,
          name: name,
          role: 'user',
          mail: email,
        },
        cookieClickerData: {
          upgradeData: {
            clickUpgradeLevel: 1,
            grandmaUpgradeLevel: 1,
          },
          playerData: { cookiesInTotal: 0, cookies: 0, clickValue: 1, passiveClicks: 0 },
        },
      });
      window.location.reload();
      return true;
    } catch (e) {
      console.log('was not abtle to set doc ');
      return false;
    }
  }
}
export function getCurrentUser() {
  const auth = getAuth(app);
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      currentUser => {
        user.value = currentUser;
        unsubscribe();
        resolve(currentUser);
      },
      reject
    );
  });
}
