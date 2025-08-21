// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB8to_PzEZQuSQYPcWrcCa2V8iyz4d-zQI",
  authDomain: "dearecho-535b4.firebaseapp.com",
  projectId: "dearecho-535b4",
  storageBucket: "dearecho-535b4.firebasestorage.app",
  messagingSenderId: "505128845871",
  appId: "1:505128845871:web:f9e07c9de7bfd73123bcda",
  measurementId: "G-F77BQSQ51X"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };