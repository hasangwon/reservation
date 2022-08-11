import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgVXWqE04axUuwyKcEdr5PoVv-4KD8lCU",
  authDomain: "testproject-e1d8b.firebaseapp.com",
  projectId: "testproject-e1d8b",
  storageBucket: "testproject-e1d8b.appspot.com",
  messagingSenderId: "285480043942",
  appId: "1:285480043942:web:673629db8b2d6e76047b67",
  measurementId: "G-H2DG9SC7NF",
};
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };
