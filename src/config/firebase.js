import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgtxMZE-imwF9jO0yUKIQtXGFy6MmszDc",
  authDomain: "web-project-2967e.firebaseapp.com",
  projectId: "web-project-2967e",
  storageBucket: "web-project-2967e.appspot.com",
  messagingSenderId: "623932001931",
  appId: "1:623932001931:web:1421861d4c4c9602f3ce8e",
  measurementId: "G-CPW0XEFVEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();