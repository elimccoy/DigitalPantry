import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';

const PantryEditScreen = ({ route, navigation }) => {



  return(

    <View style={styles.container}>
      <Text>Pantry Edit Screen</Text>

    </View>
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: 'orange',
  },


});

export default PantryEditScreen;