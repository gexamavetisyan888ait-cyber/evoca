import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCq9O0Ka1glmTpt59i7FhVzmpNCz-76zj0",
  authDomain: "evoca-4b603.firebaseapp.com",
  projectId: "evoca-4b603",
  storageBucket: "evoca-4b603.firebasestorage.app",
  messagingSenderId: "906423834999",
  appId: "1:906423834999:web:c8e42606f2193ec6eca972",
  measurementId: "G-G2DRW9L3X0",
  databaseURL: "https://evoca-4b603-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const db = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // Ավելացված է storage-ը
export const googleProvider = new GoogleAuthProvider();
export default app;