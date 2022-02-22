import 'react-native-get-random-values';

import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import SignInScreen from './screens/Auth_Stack/SignInScreen';
import MainTabNav from './screens/Main_Stack/MainTabNav';
import './firebase'; // Initializes firebase
import store from './store';
import UserProvider, { getUser } from './UserProvider';
import { fetchSavedRecipes } from './API/firebaseMethods';
import { setSavedRecipes } from './store/slices/recipes';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const user = getUser();
  const dispatch = useDispatch();

  // Initally fetch recipes from fiebase
  useEffect(() => {
    if (!user) {
      return;
    }

    fetchSavedRecipes(user.id)
      .then((recipes) => {
        dispatch(setSavedRecipes(recipes));
      });
  }, [dispatch, user]);

  return (
    <NavigationContainer>
      <StatusBar translucent={false} backgroundColor='white' />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        { user ? (
          <Stack.Screen name="MainTabNav" component={MainTabNav}/>
        ):(
          <Stack.Screen name="SignIn" component={SignInScreen}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ReduxProvider store={store}>
        <PaperProvider>
          <Navigation />
        </PaperProvider>
      </ReduxProvider>
    </UserProvider>
  );
}
