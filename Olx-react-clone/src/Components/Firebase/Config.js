
import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import { getAuth } from "firebase/auth";  
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA3Ez75TgWbB-xBodu2daHvrzWmkCDqH5Y",
  authDomain: "olx-react-clone-b551c.firebaseapp.com",
  projectId: "olx-react-clone-b551c",
  storageBucket: "olx-react-clone-b551c.appspot.com",
  messagingSenderId: "295655395490",
  appId: "1:295655395490:web:9d68ade5effd53303287fb",
  measurementId: "G-Y1F2Y41WX4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app) 
export const storage = getStorage(app);
