// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1L2APF9GF_aKKvUEYDmaMicruSi_Y31U",
  authDomain: "assignment5-jenkins.firebaseapp.com",
  projectId: "assignment5-jenkins",
  storageBucket: "assignment5-jenkins.firebasestorage.app",
  messagingSenderId: "528279815233",
  appId: "1:528279815233:web:06ea1f9676ec072d26f2c0",
  measurementId: "G-DZJ0J3RPD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);