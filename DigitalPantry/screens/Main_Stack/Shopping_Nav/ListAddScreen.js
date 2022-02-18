import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { StatusBar } from 'expo-status-bar';



const ListAddScreen = ({ navigation }) => {
  const [itm, setItm] = useState({});
  const [itmName, setItmName] = useState('');
  const [amt, setAmt] = useState('');
  const [units, setUnits] = useState('');
  const [key, setKey] = useState('');
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

  //adds item to list
  const add = () => {
    const amtInt = parseInt(amt);
    const k = (amtInt * 3).toString();
    setKey(k);
    const newItm = { key: k, amount: amt, name: itmName, data: 'idk' }; //make object

    setItm({ key: key, amount: amt, name: itmName, data: units });
    navigation.navigate('ShoppingScreen', { newItem: newItm }); //pass object to ShoppingScreen to be added
  };


  return (
    <ScrollView keyboardShouldPersistTaps='handled'>

      <View style={styles.container}>
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
          keyboardType='numeric'
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

        <View style={styles.buttonContainer}>
          <Button icon="check" mode="contained" onPress={() => add()}>
            Done
          </Button>
        </View>
      </View>
    </ScrollView>
  );

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


export default ListAddScreen;