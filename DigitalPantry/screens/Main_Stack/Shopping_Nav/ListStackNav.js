import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingScreen from './ShoppingScreen';
import ListAddScreen from './ListAddScreen';
import ListEditDeleteScreen from './ListEditDeleteScreen';
import CustomNavigationBar from './CustomNavigationBar';
import ListItemInfoScreen from './ListItemInfoScreen';

/**
 * Stack Navigator for shopping navigation
 */

const ListStack = createNativeStackNavigator(); 

const ListStackNav = () => { 
  // initial header is the CustomNavigationBar
  return (
    <ListStack.Navigator initialRouteName="ShoppingScreen" screenOptions={{ header: (props) => <CustomNavigationBar {...props} /> }}>
      <ListStack.Screen name="ShoppingScreen" component={ShoppingScreen} />
      <ListStack.Screen name="ListAddScreen" component={ListAddScreen} />
      <ListStack.Screen name="ListEditDeleteScreen" component={ListEditDeleteScreen} />
      <ListStack.Screen name="ListItemInfoScreen" component={ListItemInfoScreen} />
    </ListStack.Navigator>
  );
}

export default ListStackNav;