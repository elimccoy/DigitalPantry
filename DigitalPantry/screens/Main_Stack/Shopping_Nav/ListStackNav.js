import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ShoppingScreen from './ShoppingScreen';
import ListAddScreen from './ListAddScreen';

/**
 * TO-DO: add edit/delete screen
 */

const ListStack = createNativeStackNavigator();

const ListStackNav = () => { //navigator for list related screens
  return (
    <ListStack.Navigator screenOptions={{ headerShown: false }}>

      <ListStack.Screen name="ShoppingScreen" component={ShoppingScreen} />

      <ListStack.Screen name="ListAddScreen" component={ListAddScreen} />

    </ListStack.Navigator>
  );
}

export default ListStackNav;