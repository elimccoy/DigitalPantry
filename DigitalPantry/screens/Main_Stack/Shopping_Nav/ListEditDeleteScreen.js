import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, Button, Avatar } from 'react-native-paper';
import { editItem, deleteItem } from '../../../store/slices/shoppingList';
import DropDown from "react-native-paper-dropdown";

const ListEditDeleteScreen = ({ route, navigation }) => {

  const initialItem = route.params.itemToEdit;
  console.log(initialItem.expirationDate);

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
      unit: units,
    }));

    navigation.navigate('ShoppingScreen');
  };

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-evenly' }}>
          <Avatar.Image size={128} style={styles.avatarStyles} source={{ uri: initialItem.image }} />
          <TextInput
            label='Name:'
            mode={'outlined'}
            value={itmName}
            onChangeText={itmName => setItmName(itmName)}
          />

          <TextInput
            label='Amount:'
            mode={'outlined'}
            keyboardType='numeric'
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
  avatarStyles: {
    alignSelf: 'center',
    marginBottom: 7,
  },
});


export default ListEditDeleteScreen;