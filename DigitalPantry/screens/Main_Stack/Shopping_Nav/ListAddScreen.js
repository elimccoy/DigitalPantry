import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, Button, Avatar } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { addItem } from '../../../store/slices/shoppingList';
import { v4 as uuid } from 'uuid';

/**
 * Screen for users to manually add their own customized item to the shopping list. Prompts users to enter and submit data for their item.
 */

const ListAddScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  // states for the data that will make up the user's ingredient.
  const [itmName, setItmName] = useState('');
  const [amt, setAmt] = useState('');
  const [units, setUnits] = useState('');
  const [img, setImg] = useState('https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg');
  const [itemBrand, setBrand] = useState('');
  const [desc, setDescription] = useState('');
  const [amtRemaining, setRemaining] = useState('');
  const [expDate, setExpirationDate] = useState('');
  const [itemCategory, setCategory] = useState(''); 

  // state that will be used to determine whether to show dropdown menu used to select units/measurements
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  // list of units of measurement for ingredients
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

  /** function triggered when the user taps on 'Done'. Passes data to the 'addItem' reducer in shopingList.js. The data passed 
   * is an array containing data (states above) for an ingredient.
   */
  const confirm = () => {
    dispatch(addItem({
      key: uuid(), // since this is a new item created by the user (not a suggested item from the pantry), it doesn't have a key so we generate it
      amount: amt,
      name: itmName,
      unit: units,
      image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg', // items created by the user will have the same image, no implementation for users to upload their own images
      brand: itemBrand,
      description: desc,
      remaining: amtRemaining,
      expirationDate: expDate,
      category: itemCategory,
    }));

    navigation.navigate('ShoppingScreen'); // return to shopping screen after adding item
  };

  /**
   * Screen is wrapped in a ScrollView component with 'keyboardShouldPersistTaps' attribute to dismiss the keyboard when the user taps outside of
   * input fields or buttons. Image is displayeed along with the input fields and 'Done' button. When TextInputs change, so do the states.
   */
  return (
    <ScrollView keyboardShouldPersistTaps='handled'> 

      <View style={styles.container}> 
        <View style={{ justifyContent: 'space-evenly' }}>
          <Avatar.Image size={128} style={styles.avatarStyles} source={{ uri: img }} />
          <TextInput
            label='Name:'
            mode={'outlined'}
            value={itmName}
            onChangeText={itmName => setItmName(itmName)}
          />
          <TextInput
            label='Brand:'
            mode={'outlined'}
            value={itemBrand}
            onChangeText={itemBrand => setBrand(itemBrand)}
          />
          <TextInput
            label='Description:'
            mode={'outlined'}
            value={desc}
            onChangeText={desc => setDescription(desc)}
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

          <View style={styles.buttonContainer}>
            <Button icon='check' mode='contained' onPress={() => confirm()}>
              Done
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
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
  },
  avatarStyles: { // styling for image
    alignSelf: 'center',
    marginBottom: 7,
  },
});


export default ListAddScreen;