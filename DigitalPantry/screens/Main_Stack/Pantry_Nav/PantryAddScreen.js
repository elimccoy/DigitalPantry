import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-paper';

const PantryAddScreen = ({ route, navigation }) => {

  console.debug('statusBarHeight: ', StatusBar.currentHeight);

const addItemName = () =>
{
  const[text, setText] =  React.useState("");

  return( 
  <TextInput
  label="Email"
  value={text}
  onChangeText={text => setText(text)}
  />
  );
};

  return(
    <View style={styles.container}>
      <Text>Pantry Add Screen</Text>
      
    </View>
  );

  console.debug('statusBarHeight: ', StatusBar.currentHeight);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },

});

export default PantryAddScreen;