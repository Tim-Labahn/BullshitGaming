import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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

// export async function getList() {
//   const querySnapshot = await getDocs(collection(db, 'todolist_items'));
//   return querySnapshot.docs
//     .map(item => ({ ...(item.data() as { name: string }), id: item.id }))
//     .sort(function (a, b) {
//       return a.name.localeCompare(b.name);
//     });
// }

// export async function updateItem(itemID: string, itemData: string) {
//   await updateDoc(doc(db, 'todolist_items', itemID), {
//     name: itemData,
//   });
// }

// export async function addItem(itemData: string) {
//   await addDoc(collection(db, 'todolist_items'), {
//     name: itemData,
//   });
// }

// export async function deleteItem(itemID: string) {
//   await deleteDoc(doc(db, 'todolist_items', itemID));
// }

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

export async function register(name: string, email: string, password: string): Promise<void> {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(getFirestore(), 'users', userCredential.user.uid), {
    name: name,
    role: 'user',
    groups: [],
  });
  window.location.reload();
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
