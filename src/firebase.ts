// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyA-CR2CRiynjFnVe1MEWJ8A6PYKMpcDgPE",
  authDomain: "dearecho-f89fc.firebaseapp.com",
  projectId: "dearecho-f89fc",
  storageBucket: "dearecho-f89fc.firebasestorage.app",
  messagingSenderId: "990458322061",
  appId: "1:990458322061:web:308f32bee63dd279add6c4"
};


export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()