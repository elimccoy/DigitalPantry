/**
 * Name: firebase.js
 * Desc: Contains the constants and initial code to initialize the firebase code.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp, getApp } from 'firebase/app';
import { initializeAuth, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyCMcQYxPpoFREEVPgSm1qFEMSBd6jbldVc',
  authDomain: 'digitalpantry-481.firebaseapp.com',
  projectId: 'digitalpantry-481',
  storageBucket: 'digitalpantry-481.appspot.com',
  messagingSenderId: '957242178167',
  appId: '1:957242178167:web:1d29e23ae227628773e472',
};

// Initializes app on first reload and prevents crashing on reloads by using getApp() if the app has already been initialized.
// This is due to the fact that while hotreloading, the initialization code would normally run again after the app was already initialized.
let app;
let auth;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth();
}

export const firebaseApp = firebaseApp;
export const firebaseAuth = auth;

export const db = getFirestore(firebaseApp);
