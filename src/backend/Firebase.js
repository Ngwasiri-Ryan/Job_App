
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYQJcPU2_tVkX5B6K9I3yQmmW1vKbt7Kw",
  authDomain: "jobquest-19789.firebaseapp.com",
  projectId: "jobquest-19789",
  storageBucket: "jobquest-19789.firebasestorage.app",
  messagingSenderId: "975097210975",
  appId: "1:975097210975:web:2f0df3d8d4967c985513ea",
  measurementId: "G-868DRL86WF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
