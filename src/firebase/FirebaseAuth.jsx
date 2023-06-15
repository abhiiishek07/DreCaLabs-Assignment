import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
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

export const signInWithGoogle = (onSuccess) => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // Handle successful login
      onSuccess();
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
};
export const signInWithGithub = (onSuccess) => {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      // Handle successful login
      onSuccess();
    })
    .catch((error) => {
      // Handle error
      console.log(error);
    });
};
export const db = getFirestore(app);
