import 'react-native-get-random-values';

import React, { useState } from 'react';
import { LogBox } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import SignInScreen from './screens/Auth_Stack/SignInScreen';
import MainTabNav from './screens/Main_Stack/MainTabNav';
import './firebase'; // Initializes firebase
import {
  getAuth,
  onAuthStateChanged,
} from 'firebase/auth';
import store from './store';

LogBox.ignoreLogs(['Setting a timer']);

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
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}
