import MySuggested from './MySuggested';
import MyRecipesNavigation from './MyRecipesNavigation';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Header } from '../../Header';

const TopTab = createMaterialTopTabNavigator();

const TopNavigator = () => {

  return (

    <TopTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: '#6200EE',
        },
        header: Header,
      }}
    >
      <TopTab.Screen name="Saved" component={MyRecipesNavigation} />
      <TopTab.Screen name="Suggested" component={MySuggested} />

    </TopTab.Navigator>

  );
}

export default TopNavigator;