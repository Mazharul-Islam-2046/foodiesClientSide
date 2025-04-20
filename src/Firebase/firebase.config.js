// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXGlaKEQyGWcbZBNqlCXILNY1r2M-FEPM",
  authDomain: "foodies-19192.firebaseapp.com",
  projectId: "foodies-19192",
  storageBucket: "foodies-19192.firebasestorage.app",
  messagingSenderId: "1047716719762",
  appId: "1:1047716719762:web:ba2c2d05c2ce54a0920a4b",
  measurementId: "G-M4TPR08CKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;