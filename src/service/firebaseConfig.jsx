// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdTctA3l111ekwOKNoCohmtEakOAoIYOU",
  authDomain: "ai-trip-planner-ec051.firebaseapp.com",
  projectId: "ai-trip-planner-ec051",
  storageBucket: "ai-trip-planner-ec051.appspot.com",
  messagingSenderId: "436472852902",
  appId: "1:436472852902:web:379070bd0ff6df0f08df67",
  measurementId: "G-BX3BXRBPCS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)