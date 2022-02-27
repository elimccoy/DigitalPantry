import 'react-native-get-random-values';

import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import SignInScreen from './screens/Auth_Stack/SignInScreen';
import MainTabNav from './screens/Main_Stack/MainTabNav';
import firebaseConfig from './firebase'
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import {
  getAuth,
  initializeAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import { store, persistor } from './store';

// Initializes app on first reload and prevents crashing on reloads
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

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); //SET TO FALSE FOR AUTH.

  // Listen for authentication state to change.
  onAuthStateChanged(auth, user => {
    if (user != null) {
      setIsSignedIn(true);
    }
    else {
      setIsSignedIn(false);
    }
  });

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar translucent={false} backgroundColor='white' />
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {isSignedIn ? (
                <Stack.Screen name="MainTabNav" component={MainTabNav}/>
              ):(
                <Stack.Screen name="SignIn" component={SignInScreen}/>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
