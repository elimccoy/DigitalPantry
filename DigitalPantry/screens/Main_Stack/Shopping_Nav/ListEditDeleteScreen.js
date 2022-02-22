import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import { editItem, deleteItem } from '../../../store/slices/shoppingList';
import DropDown from "react-native-paper-dropdown";


const ListEditDeleteScreen = ({ route, navigation }) => { //will take in functions

  const initialItem = route.params.itemToEdit;

  const dispatch = useDispatch();
  const [itmName, setItmName] = useState(initialItem.name);
  const [amt, setAmt] = useState(initialItem.amount);
  const [units, setUnits] = useState(initialItem.units);
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

  const _deleteItem = () => {
    dispatch(deleteItem(initialItem.key));
    navigation.navigate('ShoppingScreen');
  };

  const _editItem = () => {
    dispatch(editItem({
      key: initialItem.key,
      amount: amt,
      name: itmName,
      data: units,
      info: initialItem.info,
    }));

    navigation.navigate('ShoppingScreen');
  };

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={{ justifyContent: 'space-evenly' }}>
        <TextInput
          label='Name:'
          mode={'outlined'}
          value={itmName}
          onChangeText={itmName => setItmName(itmName)}
        />

        <TextInput
          label='Amount:'
          mode={'outlined'}
          value={amt}
          onChangeText={amt => setAmt(amt)}
        />

        <DropDown
          label={'Measurements:'}
          mode={'outlined'}
          visible={showMultiSelectDropDown}
          showDropDown={() => setShowMultiSelectDropDown(true)}
          onDismiss={() => setShowMultiSelectDropDown(false)}
          value={units}
          setValue={(res) => { setUnits(res) }}
          list={measurementList}
        />

        <View style={{ flexDirection: 'row' }}>

          <View style={styles.buttonContainer}>
            <Button icon='check' mode='contained' onPress={() => _editItem()}>
              Done
            </Button>
          </View>

          <View style={styles.buttonContainer}>
            <Button icon='delete' mode='contained' onPress={() => _deleteItem()}>
              Delete
            </Button>
          </View>

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
  //  marginTop: StatusBar.currentHeight,
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
  },
});


export default ListEditDeleteScreen;