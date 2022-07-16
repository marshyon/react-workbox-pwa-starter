import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
import env from "react-dotenv";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain: env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export  { db, auth };