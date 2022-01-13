import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home_Nav/HomeScreen';
import PantryScreen from './Pantry_Nav/PantryScreen';
import RecipeScreen from './Recipe_Nav/RecipeScreen';
import ShoppingScreen from './Shopping_Nav/ShoppingScreen';

const MainTab = createBottomTabNavigator();

const MainTabNav = () => {
  return(
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } 

        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Pantry" component={PantryScreen} />
      <MainTab.Screen name="Recipe" component={RecipeScreen} />
      <MainTab.Screen name="Shopping" component={ShoppingScreen} />
    </MainTab.Navigator>
  );
}

export default MainTabNav;