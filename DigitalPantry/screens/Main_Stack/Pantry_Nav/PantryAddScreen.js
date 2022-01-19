import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-paper';

const PantryAddScreen = ({ route, navigation }) => {
  const[text, setText] =  React.useState("");
  
  console.debug('statusBarHeight: ', StatusBar.currentHeight);


    return(
      <View style={styles.container}>
      <Text>Pantry Add Screen</Text>
      
      <TextInput
      label="Add Item Name"
      value={text}
      onChangeText={text => setText(text)}
      />
      
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },

});

export default PantryAddScreen;