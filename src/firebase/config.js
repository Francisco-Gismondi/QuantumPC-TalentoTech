// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoIMWgt6aBdDOtF1t_doJfVAQJocUprjQ",
  authDomain: "quantum-pc-d7f12.firebaseapp.com",
  projectId: "quantum-pc-d7f12",
  storageBucket: "quantum-pc-d7f12.firebasestorage.app",
  messagingSenderId: "1068166975005",
  appId: "1:1068166975005:web:0a16528e023704a58540f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
