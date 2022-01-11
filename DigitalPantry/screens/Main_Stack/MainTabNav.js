import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import MainScreen from './MainScreen';
import RecipeScreen from './RecipeScreen';
import ShopingListScreen from './ShoppingListScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Main" component={MainScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Recipe" component={RecipeScreen} />
        <Tab.Screen name="Shopping" component={ShopingListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}