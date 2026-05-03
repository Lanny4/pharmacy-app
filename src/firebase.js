import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4PsGvCnO_OIJ7T5XjRk9fDjwIOnHYnJM",
  authDomain: "pharmacyapp-cca7d.firebaseapp.com",
  projectId: "pharmacyapp-cca7d",
  storageBucket: "pharmacyapp-cca7d.firebasestorage.app",
  messagingSenderId: "445860520823",
  appId: "1:445860520823:web:c80f8b92b2af3389b43772",
  measurementId: "G-64N6YFVVRN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;