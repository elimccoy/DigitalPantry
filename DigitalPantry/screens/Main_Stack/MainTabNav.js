import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Home_Nav/HomeScreen';
import PantryScreen from './Pantry_Nav/PantryScreen';
import RecipeScreen from './Recipe_Nav/RecipeScreen';
import ShoppingScreen from './Shopping_Nav/ShoppingScreen';
import { AntDesign } from '@expo/vector-icons'; 

const MainTab = createBottomTabNavigator();

const MainTabNav = () => {
  return(
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Pantry') {
            iconName = 'form'
          }  else if (route.name === 'Recipe') {
            iconName = 'book'
          }  else if (route.name === 'Shopping') {
            iconName = 'shoppingcart'
          } 

          return <AntDesign name={iconName} size={size} color={color} />
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