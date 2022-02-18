import { Keyboard, StyleSheet, TouchableWithoutFeedback, View , ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput, Button } from 'react-native-paper';
import LoadingScreen from '../LoadingScreen';
import { StatusBar } from 'expo-status-bar';
import DropDown from "react-native-paper-dropdown";

/**TO-DO
 * change keys (hard coded for now)
 * Styling: make it more similar to pantry edit screen
 */
const ListEditDeleteScreen = ({ route, navigation }) => { //will take in functions
  const [itm, setItm] = useState(null);
  const [itmName, setItmName] = useState('');
  const [amt, setAmt] = useState('');
  const [units, setUnits] = useState('');
  const [key, setKey] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const measurementList = [
    {
      label: "Pack",
      value: "Pack",
    },
    {
      label: "Bag",
      value: "Bag",
    },
    {
      label: "Tablespoon",
      value: "Tablespoon",
    },
    {
      label: "Ounce",
      value: "Ounce",
    },
    {
      label: "Cup",
      value: "Cup",
    },
    {
      label: "Quart",
      value: "Quart",
    },
    {
      label: "Pint",
      value: "Pint",
    },
    {
      label: "Pound",
      value: "Pound",
    },
    {
      label: "Gallon",
      value: "Gallon",
    },
    {
      label: "Milliliter",
      value: "Milliliter",
    },
    {
      label: "Grams",
      value: "Grams",
    },
    {
      label: "Kilogram",
      value: "Kilogram",
    },
    {
      label: "Liter",
      value: "Liter",
    },
  ];

  useEffect(() => {
    if (route.params !== undefined) {
      let { itemToEdit } = route.params;
      setItm(itemToEdit);
      setItmName(itemToEdit.name);
      setAmt(itemToEdit.amount);
      setUnits(itemToEdit.units);
      setKey(itemToEdit.key);
      setIsLoaded(true);
    };
  }, [route.params]);


  const deleteItem = () => {
    const newItm = { key: key, amount: amt, name: undefined, data: units }; //flag object
    setItm(newItm);
    navigation.navigate('ShoppingScreen', { newItem: newItm }); // 1 is delete
  }

  const editItem = () => {
    const newItm = { key: key, amount: amt, name: itmName, data: units }; //make object
    //setItm(newItm);

    navigation.navigate('ShoppingScreen', { newItem: newItm }); // 1 is edit
  }


  if (isLoaded) {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-evenly' }}>
          
         
              <TextInput
                label="Name:"
                //style={styles.input}
                mode={"outlined"}
                value={itmName}
                onChangeText={itmName => setItmName(itmName)}
              />
         

          <TextInput
            label="Amount:"
            mode={"outlined"}
            //style={styles.input}
            keyboardType = 'numeric'
            value={amt}
            onChangeText={amt => setAmt(amt)}
          />

          <DropDown
            label={"Measurements: "}
            mode={"outlined"}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={units}
            setValue={(res) => { setUnits(res) }}
            list={measurementList}
          />

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.buttonContainer}>
              <Button icon="check" mode="contained" onPress={() => editItem()}>
                Done
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button icon="delete" mode="contained" onPress={() => deleteItem()}>
                Delete
              </Button>
            </View>
          </View>

        </View>
      </View>
      </ScrollView>
    );
  } else {
    return (<LoadingScreen />);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
  },

  buttonContainer: {
    flex: 1,
    padding: 10,
  },

});


export default ListEditDeleteScreen;