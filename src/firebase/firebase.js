import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkUEkOBVWJdAwHzBS07-bLB17XnUDzUrE",
  authDomain: "shortener-url-c43bf.firebaseapp.com",
  projectId: "shortener-url-c43bf",
  storageBucket: "shortener-url-c43bf.appspot.com",
  messagingSenderId: "799204303183",
  appId: "1:799204303183:web:2fba457950edd359cca53a",
  measurementId: "G-5JGDJTS52G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
