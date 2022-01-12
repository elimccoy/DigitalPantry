import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PantryScreen from './PantryScreen';
import BarCodeScannerScreen from './BarCodeScannerScreen';

const PantryStack = createNativeStackNavigator();

const PantryStackNav = () => {
  return(
    <PantryStack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <PantryStack.Screen name="PantryScreen" component={PantryScreen}/>
      <PantryStack.Screen name="BarCodeScannerScreen" component={BarCodeScannerScreen}/>
    </PantryStack.Navigator>
  );
}

export default PantryStackNav;