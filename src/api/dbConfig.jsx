import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCMDqE9UHC79iJ1_fGwpNysbBPO3SVw-tU",
  authDomain: "promo-developers.firebaseapp.com",
  databaseURL: "https://promo-developers-default-rtdb.firebaseio.com",
  projectId: "promo-developers",
  storageBucket: "promo-developers.appspot.com",
  messagingSenderId: "1073164355581",
  appId: "1:1073164355581:web:c93eee0bb9a5e5486fbb94",
  measurementId: "G-KHH55VM4EP"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app);
