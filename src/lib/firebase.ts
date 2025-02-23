import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtc_vdoPcP57BNVoju330AZNa7t-3FAP8",
  authDomain: "modelviewapi.firebaseapp.com",
  projectId: "modelviewapi",
  storageBucket: "modelviewapi.firebasestorage.app",
  messagingSenderId: "262886393974",
  appId: "1:262886393974:web:c0ca0ddd339d7a09513757",
  measurementId: "G-RMMM5ZRJQR"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let analytics = null;
let storage = null;
let db = null;

// Client-side-only code
if (typeof window !== 'undefined') {
  storage = getStorage(app);
  db = getFirestore(app);
  
  // Analytics'i yalnızca desteklenen ortamlarda başlat
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, storage, db }; 