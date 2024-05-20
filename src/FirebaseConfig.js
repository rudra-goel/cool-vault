// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfpMogz6_Vgn989mmI2cayB_F5gjkNUu4",
  authDomain: "cool-vault.firebaseapp.com",
  projectId: "cool-vault",
  storageBucket: "cool-vault.appspot.com",
  messagingSenderId: "321128534525",
  appId: "1:321128534525:web:84f9b638909a484c9ac994"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;
export const auth = getAuth();
const db = getFirestore(app)

export { db }
