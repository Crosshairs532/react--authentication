// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdBD87zZSzeLaquDcnQzYkgMP0CtPjQzY",
    authDomain: "email-password-authantic-2e487.firebaseapp.com",
    projectId: "email-password-authantic-2e487",
    storageBucket: "email-password-authantic-2e487.appspot.com",
    messagingSenderId: "398517182855",
    appId: "1:398517182855:web:a776181c17ac82655a7322"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
// export default app;