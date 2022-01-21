import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantryScreen from './PantryScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen';
import PantryAddScreen from './PantryAddScreen';


const PantryStack = createNativeStackNavigator();

const PantryStackNav = () => {

  return (
    <PantryStack.Navigator 
    screenOptions={{headerShown: false}}
    >
      <PantryStack.Screen name="PantryScreen" component={PantryScreen}/>
      <PantryStack.Screen name="BarcodeScreen" component={BarcodeScannerScreen}/>
     
      <PantryStack.Screen name="AddScreen" component={PantryAddScreen}/> 
    </PantryStack.Navigator>
  );
}

export default PantryStackNav;