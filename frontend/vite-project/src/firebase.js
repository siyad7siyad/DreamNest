// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dream-nest-bbb04.firebaseapp.com",
  projectId: "dream-nest-bbb04",
  storageBucket: "dream-nest-bbb04.appspot.com",
  messagingSenderId: "97839123962",
  appId: "1:97839123962:web:9d0bb7a5eaafb500966843"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);