import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import SignInScreen from './screens/Auth_Stack/SignInScreen';
import MainTabNav from './screens/Main_Stack/MainTabNav';
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
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
        >
          {true ? (
            <Stack.Screen name="MainTabNav" component={MainTabNav}/>
          ):(
            <Stack.Screen name="SignIn" component={SignInScreen}/>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
