import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

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

const fire_base = {
  db: firebase.firestore(),
  storage: firebase.storage(),
};

export default {
  install: (app) => {
    app.config.globalProperties.$fire_base = fire_base;
  },
};
