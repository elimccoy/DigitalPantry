import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantryScreen from './PantryScreen';
import BarcodeScannerScreen from './BarcodeScannerScreen';

const PantryStack = createNativeStackNavigator();

const PantryStackNav = () => {

  return (
    <PantryStack.Navigator 
    screenOptions={{headerShown: false}}
    >
      <PantryStack.Screen name="PantryScreen" component={PantryScreen}/>
      <PantryStack.Screen name="BarcodeScreen" component={BarcodeScannerScreen}/>
    </PantryStack.Navigator>
  );
}

export default PantryStackNav;