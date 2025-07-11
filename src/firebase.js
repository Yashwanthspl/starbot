import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInAnonymously, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDhAHdw-8gw7-25cAdiRW-MmQpB2GMKpvM",
  authDomain: "starbothealth.firebaseapp.com",
  projectId: "starbothealth",
  storageBucket: "starbothealth.firebasestorage.app",
  messagingSenderId: "154113204748",
  appId: "1:154113204748:web:8604e383f6301cc7350429",
  measurementId: "G-ZDT3K7SS92"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInAnonymously, signOut };
