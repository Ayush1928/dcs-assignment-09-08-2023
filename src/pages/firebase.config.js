import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "dcs-assignment-09-08-2023.firebaseapp.com",
  projectId: "dcs-assignment-09-08-2023",
  storageBucket: "dcs-assignment-09-08-2023.appspot.com",
  messagingSenderId: "762481713480",
  appId: "1:762481713480:web:118e23b781ebda57eb537d",
  measurementId: "G-WYD6LMB0PM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);