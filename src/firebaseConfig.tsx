import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCS_VQbF3aEbKUjKi4Orhtv7BVWJsTmZNk",
  authDomain: "pathtopurpose-eea1a.firebaseapp.com",
  projectId: "pathtopurpose-eea1a",
  storageBucket: "pathtopurpose-eea1a.firebasestorage.app",
  messagingSenderId: "866036588537",
  appId: "1:866036588537:web:cbf1542a27215157aaa728",
  measurementId: "G-YKSV7DN00E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);