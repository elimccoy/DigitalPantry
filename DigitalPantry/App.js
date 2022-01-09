import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './navigation/Auth_Stack/SignInScreen';
import MainScreen from './navigation/Main_Stack/MainScreen';
import firebaseConfig from './firebase'
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';

initializeApp(firebaseConfig);

const auth = getAuth();
const Stack = createNativeStackNavigator();

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);

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
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen name="MainScreen" component={MainScreen}/>
        ):(
          <Stack.Screen name="SignIn" component={SignInScreen}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
