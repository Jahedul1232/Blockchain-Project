import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoj7k7Sznb-EaVjMmDDclBMZfsXQVM3L8",
  authDomain: "database-cloud-77237.firebaseapp.com",
  databaseURL: "https://database-cloud-77237-default-rtdb.firebaseio.com",
  projectId: "database-cloud-77237",
  storageBucket: "database-cloud-77237.appspot.com",
  messagingSenderId: "159378714664",
  appId: "1:159378714664:web:0a5066a3df85cbb424851d",
  measurementId: "G-1BH0N9Q3L4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
