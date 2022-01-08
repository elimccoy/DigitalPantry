import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMcQYxPpoFREEVPgSm1qFEMSBd6jbldVc",
  authDomain: "digitalpantry-481.firebaseapp.com",
  projectId: "digitalpantry-481",
  storageBucket: "digitalpantry-481.appspot.com",
  messagingSenderId: "957242178167",
  appId: "1:957242178167:web:1d29e23ae227628773e472"
};

let Firebase;

if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;