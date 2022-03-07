import 'react-native-get-random-values';

import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import SignInScreen from './screens/Auth_Stack/SignInScreen';
import MainTabNav from './screens/Main_Stack/MainTabNav';
import UserProvider, { getUser } from './UserProvider';
import { fetchSavedRecipes } from './API/firebaseMethods';
import { setSavedRecipes } from './store/slices/recipes';
import { store, persistor } from './store';
import LoadingScreen from './screens/Main_Stack/LoadingScreen';

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, user]);

  return (
    <NavigationContainer>
      { user === undefined ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          { user ? (
            <Stack.Screen name="MainTabNav" component={MainTabNav}/>
          ) : (
            <Stack.Screen name="SignIn" component={SignInScreen}/>
          )
        }
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <UserProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={LoadingScreen} persistor={persistor}>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </PersistGate>
      </ReduxProvider>
    </UserProvider>
  );
}
