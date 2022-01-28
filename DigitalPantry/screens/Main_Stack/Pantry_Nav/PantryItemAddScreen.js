import { StyleSheet, View, Button } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Avatar } from 'react-native-paper';
import LoadingScreen from '../LoadingScreen';

const PantryItemAddScreen = ({ route, navigation }) => {
  
  const[passedItem, setItem] = React.useState(null);
  const[name, setName] = React.useState("Test Name");
  const[key, setKey] =  React.useState("Test");
  const[unit, setUnit] =  React.useState("Test2");
  const[amount, setAmount] =  React.useState("Test3");
  const[isLoaded, setIsLoaded] = React.useState(false);

  //Did mount:
  React.useEffect(() => {
    //Handle incoming data (either new data or edited data.)
    if(route.params !== undefined) {
      let { item } = route.params; //Get data from route;

      //Connect to API here!

      setItem(item);
      setName(item.name);
      setKey(item.key);
      setUnit(item.unit);
      setAmount(item.amount);
    }

    setIsLoaded(true);
  }, [])

  //Handlers for navigating:
  const donePressHandler = () => {

    //Create new Item data.
    var data = {
      name: name,
      key: key,
      unit: unit,
      amount: amount
    }

    //Pass data as item.
    navigation.navigate('PantryScreen', {item:data});
  }

  const morePressHandler = () => {
    navigation.navigate('BarcodeScreen');
  }

  if (isLoaded) {
    return (
      <View style={styles.container}>
        <Avatar.Image size={128} style={{ alignSelf: 'center' }} source={require('../../../assets/nutmaster.jpeg')} />
        {/*Container for text inputs*/}
        <View style={{ justifyContent: 'space-evenly' }}>
          <TextInput
            label="Add Item Name"
            defaultValue={name}
            onChangeText={name => setName(name)}
          />
          <TextInput
            label="Quantity"
            defaultValue={unit}
            onChangeText={unit => setUnit(unit)}
          />
          <TextInput
            label="Unit(s)"
            defaultValue={amount}
            onChangeText={amount => setAmount(amount)}
          />
        </View>
  
        {/*Container for buttons*/}
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Button title='Done' onPress={donePressHandler} />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <Button title='Re-Scan' onPress={morePressHandler} />
          </View>
        </View>
      </View>
    );
  }
  else {
    return(<LoadingScreen/>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },

  });

export default PantryItemAddScreen;