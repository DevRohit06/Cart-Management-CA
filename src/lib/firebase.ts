// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp, getApps, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DEMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID
};

// Initialize Firebase
let firebaseApp: FirebaseApp;

if (!getApps()?.length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApps()[0];
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storageBucket = getStorage(firebaseApp);