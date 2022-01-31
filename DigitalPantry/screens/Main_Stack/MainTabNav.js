import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home_Nav/HomeScreen';
import PantryStackNav from './Pantry_Nav/PantryStackNav'
import ShoppingScreen from './Shopping_Nav/ShoppingScreen';
import { AntDesign } from '@expo/vector-icons';
import RecipeStackNav from './Recipe_Nav/RecipeStackNav';
import MySuggested from './Recipe_Nav/MySuggested';
import RecipeAddScreen from './Recipe_Nav/RecipeAddScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import RecipeScreen from './Recipe_Nav/RecipeScreen';


const MainTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const RecipeStack = createNativeStackNavigator();



// Recipe Top tab navigation
const TopNavigator = () => {

  return (

    <TopTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: '#6200EE'
        },

      }}
    >
      <MainTab.Screen name="My Recipes" component={RecipeScreen} />
      <MainTab.Screen name="My Suggested" component={MySuggested} />
      {/*<RecipeStack.Screen name="RecipeAddScreen" component={RecipeStackNav}/>*/}

    </TopTab.Navigator>



  );

}

// App bottom tab navigation
const MainTabNav = () => {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Pantry') {
            iconName = 'form'
          } else if (route.name === 'Recipe') {
            iconName = 'book'
          } else if (route.name === 'Shopping') {
            iconName = 'shoppingcart'
          }

          return <AntDesign name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Pantry" component={PantryStackNav} />
      <MainTab.Screen name="Recipe" component={TopNavigator} />
      <MainTab.Screen name="Shopping" component={ShoppingScreen} />

    </MainTab.Navigator>

  );
}

export default MainTabNav;