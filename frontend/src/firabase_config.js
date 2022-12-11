import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_DB_APIKEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID,

  apiKey: "AIzaSyA_UdljhDs99FW6XIJka_TDrAd0cKrsIqE",
  authDomain: "blockchain-cloud.firebaseapp.com",
  projectId: "blockchain-cloud",
  storageBucket: "blockchain-cloud.appspot.com",
  messagingSenderId: "446709783985",
  appId: "1:446709783985:web:0d07f18fa7eb594445b190",
  measurementId: "G-GSTZ06D4FQ",

  // apiKey: "AIzaSyDoj7k7Sznb-EaVjMmDDclBMZfsXQVM3L8",
  // authDomain: "database-cloud-77237.firebaseapp.com",
  // databaseURL: "https://database-cloud-77237-default-rtdb.firebaseio.com",
  // projectId: "database-cloud-77237",
  // storageBucket: "database-cloud-77237.appspot.com",
  // messagingSenderId: "159378714664",
  // appId: "1:159378714664:web:0a5066a3df85cbb424851d",
  // measurementId: "G-1BH0N9Q3L4",
};
// const environment = process.env;
// console.log(environment);
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
