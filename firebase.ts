// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI1q8WJrV3aYpEXDQqoV5S4bA07blgmwY",
  authDomain: "aible-7e666.firebaseapp.com",
  projectId: "aible-7e666",
  storageBucket: "aible-7e666.appspot.com",
  messagingSenderId: "529285420170",
  appId: "1:529285420170:web:b8cc6592a21589cf1b0973"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
