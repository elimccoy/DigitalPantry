import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Button } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Avatar } from 'react-native-paper';

const PantryAddScreen = ({ route, navigation }) => {
  
  const[text, setText] =  React.useState("");

  {/*Handlers for navigating*/}
  const donePressHandler = () => {
    navigation.navigate('PantryScreen');
  }

  const morePressHandler = () => {
    navigation.navigate('BarcodeScreen');
  }

  return (
    <View style={styles.container}>

      <Avatar.Image size={128} style={{ alignSelf: 'center' }} source={require('../../../assets/nutmaster.jpeg')} />

      {/*Container for text inputs*/}
      <View style={{ justifyContent: 'space-evenly' }}>

        <TextInput
          label="Add Item Name"
          defaultValue={text}
          onChangeText={text => setText(text)}
        />

        <TextInput
          label="Quantity"
          defaultValue={text}
          onChangeText={text => setText(text)}
        />

        <TextInput
          label="Unit(s)"
          defaultValue={text}
          onChangeText={text => setText(text)}
        />

      </View>

      {/*Container for buttons*/}
      <View style={{ flexDirection: 'row', padding: 10 }}>

        <View style={{ flex: 1, padding: 10 }}>
          <Button title='Done' onPress={donePressHandler} />

        </View>

        <View style={{ flex: 1, padding: 10 }}>

          <Button title='Add More' onPress={morePressHandler} />

        </View>

      </View>

    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },

  });

export default PantryAddScreen;