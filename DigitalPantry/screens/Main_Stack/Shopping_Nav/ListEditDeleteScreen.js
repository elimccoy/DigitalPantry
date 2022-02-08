import { StyleSheet, View, Button, ScrollView } from 'react-native';
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import LoadingScreen from '../LoadingScreen';

/**TO-DO
 * change keys (hard coded for now)
 * Styling: make it more similar to pantry edit screen
 */
const ListEditDeleteScreen = ({ route, navigation }) => { //will take in functions
  const [itm, setItm] = React.useState(null);
  const [itmName, setItmName] = React.useState("");
  const [amt, setAmt] = React.useState("");
  const [units, setUnits] = React.useState("");
  const [key, setKey] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);



  React.useEffect(() => {
    if (route.params !== undefined) {
      let { itemToEdit } = route.params;
      setItm(itemToEdit);
      setItmName(itemToEdit.name);
      setAmt(itemToEdit.amount);
      setUnits(itemToEdit.units);
      setKey(itemToEdit.key);
      setIsLoaded(true);
    };
  }, []);



  const deleteItem = () => {
    var newItm = { key: key, amount: amt, name: undefined, data: units }; //flag object
    setItm(newItm);
    navigation.navigate('ShoppingScreen', { newItem: newItm }); // 1 is delete
  }

  const editItem = () => {
    var newItm = { key: key, amount: amt, name: itmName, data: units }; //make object
    //setItm(newItm);

    navigation.navigate('ShoppingScreen', { newItem: newItm }); // 1 is edit
  }


  if (isLoaded) {
    return (

      <View style={styles.container}>


        <TextInput
          style={styles.input}
          label="Product Name"
          value={itmName}
          onChangeText={itmName => setItmName(itmName)}
        />

        <TextInput
          style={styles.input}
          label="Unit"
          value={units}
          onChangeText={units => setUnits(units)}
        />

        <TextInput
          style={styles.input}
          label="Amount"
          value={amt}
          onChangeText={amt => setAmt(amt)}
        />

        <Button style={styles.button}
          title='Save changes'
          onPress={() => editItem()}
        />

        <Button style={styles.button}
          title='Delete Item'
          onPress={() => deleteItem()} //will be functions that get passed
        />


      </View>
    );
  } else {
    return (<LoadingScreen />);
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'

  },
  title: {
    fontSize: 30,
    fontWeight: '700'
  },
  input: {
    height: 40,
    margin: 17,
    borderWidth: 1,
    padding: 10,
  },

  button: {
    borderWidth: 1,
    padding: 30,
    margin: 17,
  }
});



export default ListEditDeleteScreen;