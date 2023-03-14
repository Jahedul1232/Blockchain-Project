import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import firebase from "firebase/app";
import { getStorage } from "firebase/storage";
// import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_UdljhDs99FW6XIJka_TDrAd0cKrsIqE",
  authDomain: "blockchain-cloud.firebaseapp.com",
  projectId: "blockchain-cloud",
  storageBucket: "blockchain-cloud.appspot.com",
  messagingSenderId: "446709783985",
  appId: "1:446709783985:web:0d07f18fa7eb594445b190",
  measurementId: "G-GSTZ06D4FQ",
};
// const environment = process.env;
// console.log(environment);
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const dba = firebase.firestore();
export const auth = getAuth(app);
export const storage = getStorage(app);
