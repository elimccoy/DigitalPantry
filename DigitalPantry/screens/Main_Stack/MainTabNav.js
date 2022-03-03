/**
 * Name: MainTabNav.js
 * Desc: Root page for tab navigation to each main section in the app.
 * File type: Navigation
*/

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home_Nav/HomeScreen';
import PantryStackNav from './Pantry_Nav/PantryStackNav'
import ListStackNav from './Shopping_Nav/ListStackNav';
import { AntDesign } from '@expo/vector-icons';
import RecipeStackNav from './Recipe_Nav/RecipeStackNav';
import Header from '../../components/Header';

const MainTab = createBottomTabNavigator();

// App bottom tab navigation
const MainTabNav = () => {
  return (
    <MainTab.Navigator
      //Apply icons to each tab depending on the name.
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Pantry') {
            iconName = 'form'
          } else if (route.name === 'Recipes') {
            iconName = 'book'
          } else if (route.name === 'Shopping') {
            iconName = 'shoppingcart'
          }

          return <AntDesign name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        header: Header,
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen}/>
      <MainTab.Screen name="Pantry" component={PantryStackNav} />
      <MainTab.Screen name="Recipes" component={RecipeStackNav} />
      <MainTab.Screen name="Shopping" component={ListStackNav} options={{ headerShown: false }} />
    </MainTab.Navigator>

  );
}

export default MainTabNav;