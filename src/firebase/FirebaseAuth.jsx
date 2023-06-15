import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSENGER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
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
