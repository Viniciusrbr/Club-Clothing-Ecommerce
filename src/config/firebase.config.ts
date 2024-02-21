import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDzIQtfYd2p8DNW-hUofoAvUyprml8sqys",
    authDomain: "club-ecommerce-3ba92.firebaseapp.com",
    projectId: "club-ecommerce-3ba92",
    storageBucket: "club-ecommerce-3ba92.appspot.com",
    messagingSenderId: "150739181421",
    appId: "1:150739181421:web:8915cbc4ab0fda2ef48464"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);