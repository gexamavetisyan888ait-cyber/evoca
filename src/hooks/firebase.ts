// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq9O0Ka1glmTpt59i7FhVzmpNCz-76zj0",
  authDomain: "evoca-4b603.firebaseapp.com",
  projectId: "evoca-4b603",
  storageBucket: "evoca-4b603.firebasestorage.app",
  messagingSenderId: "906423834999",
  appId: "1:906423834999:web:c8e42606f2193ec6eca972",
  measurementId: "G-G2DRW9L3X0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);