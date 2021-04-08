import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyD254h8MK7B1YFZfEYXzgfwhhOq5qMJLnM",
  authDomain: "marine-store.firebaseapp.com",
  projectId: "marine-store",
  storageBucket: "marine-store.appspot.com",
  messagingSenderId: "937230213786",
  appId: "1:937230213786:web:e6c2ab1938689c95f37523",
  measurementId: "G-RG2GQXG2W6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
