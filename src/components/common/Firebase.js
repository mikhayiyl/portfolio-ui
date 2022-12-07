// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5mrkDvJIn0JhupK4h_2Qqc5x4qzcoA7k",
    authDomain: "fb-clone-45205.firebaseapp.com",
    projectId: "fb-clone-45205",
    storageBucket: "fb-clone-45205.appspot.com",
    messagingSenderId: "762087374592",
    appId: "1:762087374592:web:081cba9ccacce5148fbde5",
    measurementId: "G-Q6BYDTM61B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;