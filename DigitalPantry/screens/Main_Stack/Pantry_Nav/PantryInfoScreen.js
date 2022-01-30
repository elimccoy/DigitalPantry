import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from '../LoadingScreen';

const PantryInfoScreen = ({ route, navigation }) => {
 
  //Did mount:
  useEffect(() => {
    //Get pantry item.


  }, []);

  
  return(<LoadingScreen/>);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '700'
  },
});

export default PantryInfoScreen;