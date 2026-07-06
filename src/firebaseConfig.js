import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDeA8B7jshYE8wc0kuyHYsKoqgIbhkoo8E",
  authDomain: "elsies-print-and-embroid.firebaseapp.com",
  projectId: "elsies-print-and-embroid",
  storageBucket: "elsies-print-and-embroid.firebasestorage.app",
  messagingSenderId: "362679962083",
  appId: "1:362679962083:web:1ee9da9f4ef69a43be78d6",
  measurementId: "G-SX284P7K7Q"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
