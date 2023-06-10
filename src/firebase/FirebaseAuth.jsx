import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBPeQNcyiKMfn1I6xWvYFxGNsHYHM5i3Wk",
  authDomain: "drecalabs.firebaseapp.com",
  projectId: "drecalabs",
  storageBucket: "drecalabs.appspot.com",
  messagingSenderId: "439138564996",
  appId: "1:439138564996:web:f9347710cacdb2c2c03bd1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider);
};
export const signInWithGithub = () => {
  signInWithPopup(auth, githubProvider);
};
// export const signOutFromGoogle = () => {
//   signOut(auth, goo);
// };
// export const signInAsGuest = () => {
//   signInAnonymously(auth, provider);
// };
export const db = getFirestore(app);
