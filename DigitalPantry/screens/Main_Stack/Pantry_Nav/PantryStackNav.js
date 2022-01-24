import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantryScreen from './PantryScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen';
import PantryItemEditScreen from './PantryItemEditScreen';
import PantryItemAddScreen from './PantryItemAddScreen';


const PantryStack = createNativeStackNavigator();

const PantryStackNav = () => {

  return (
    <PantryStack.Navigator 
    screenOptions={{headerShown: false}}
    >
      <PantryStack.Screen name="PantryScreen" component={PantryScreen}/>
      <PantryStack.Screen name="BarcodeScreen" component={BarcodeScannerScreen}/>
      <PantryStack.Screen name="EditScreen" component={PantryItemEditScreen}/>
      <PantryStack.Screen name="AddScreen" component={PantryItemAddScreen}/> 
    </PantryStack.Navigator>
  );
}

export default PantryStackNav;