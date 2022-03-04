/**
 * Name: MySuggestedNav.js
 * Desc: React native navigation screen allowing for navigation between all suggestion subscreens.
 * File type: Navigation.
*/

import MySuggested from './MySuggested';
import SuggestedSaveScreen from './SuggestedSaveScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const TopTab = createNativeStackNavigator();

const TopNavigator = () => {

  return (

    <TopTab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <TopTab.Screen name="SuggestedMain" component={MySuggested} />
      <TopTab.Screen name="AddSuggested" component={SuggestedSaveScreen} />
    </TopTab.Navigator>

  );
}

export default TopNavigator;