import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import { siteColor } from '../../styles/SiteConsts'
import ProfileScreen from './ProfileScreen';
import PantryScreen from './PantryScreen';
import RecipeScreen from './RecipeScreen';
import ShopingListScreen from './ShoppingListScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Pantry') {
            iconName="bars";
          } else if (route.name === 'Recipe') {
            iconName="book";
          } else if (route.name === 'Shopping') {
            iconName="shoppingcart";
          } else if (route.name === 'Profile') {
            iconName="user";
          }

          return <AntDesign name={iconName} size={size} color={color}/>
        },
        headerShown: false,
        tabBarActiveTintColor: siteColor,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Pantry" component={PantryScreen} />
      <Tab.Screen name="Recipe" component={RecipeScreen} />
      <Tab.Screen name="Shopping" component={ShopingListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}