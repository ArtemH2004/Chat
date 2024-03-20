import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiF368GJbJkLJ84pyErlk_mggRLmurV2I",
  authDomain: "chat-1b4ff.firebaseapp.com",
  projectId: "chat-1b4ff",
  storageBucket: "chat-1b4ff.appspot.com",
  messagingSenderId: "377197762476",
  appId: "1:377197762476:web:a80c2decde29583d560c09"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
