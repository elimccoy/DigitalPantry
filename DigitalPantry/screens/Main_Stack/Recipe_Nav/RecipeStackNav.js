import MySuggestedNav from './MySuggestedNav'
import MyRecipesNavigation from './MyRecipesNavigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();

const TopNavigator = () => {

  return (

    <TopTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: '#6200EE',
        },
      }}
    >
      <TopTab.Screen name="Saved" component={MyRecipesNavigation} />
      <TopTab.Screen name="Suggested" component={MySuggestedNav} />

    </TopTab.Navigator>

  );
}

export default TopNavigator;