// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBEvBZUyYLR0BsubJTzusjUJi4CFyprzg",
  authDomain: "psico-vivir.firebaseapp.com",
  databaseURL: "https://psico-vivir-default-rtdb.firebaseio.com",
  projectId: "psico-vivir",
  storageBucket: "psico-vivir.appspot.com",
  messagingSenderId: "424481754577",
  appId: "1:424481754577:web:22efe3d711e0458688a4f0"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
