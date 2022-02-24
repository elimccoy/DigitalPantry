import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, Button, Avatar } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import { addItem } from '../../../store/slices/shoppingList';

const ListAddScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const [itmName, setItmName] = useState('');
  const [amt, setAmt] = useState('');
  const [units, setUnits] = useState('');
  const [img, setImg] = useState('https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg');
  const [itemBrand, setBrand] = useState('');
  const [desc, setDescription] = useState('');
  const [amtRemaining, setRemaining] = useState('');
  const [expDate, setExpirationDate] = useState('');
  const [itemCategory, setCategory] = useState('');
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  useState(false);
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

  const confirm = () => {
    dispatch(addItem({
      amount: amt,
      name: itmName,
      unit: units,
      image: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
      brand: itemBrand,
      description: desc,
      remaining: amtRemaining,
      expirationDate: expDate,
      category: itemCategory,
    }));

    navigation.navigate('ShoppingScreen'); // return to shopping screen
  };

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>

      <View style={styles.container}>
        <View style={{ justifyContent: 'space-evenly' }}>
          <Avatar.Image size={128} style={styles.avatarStyles} source={ {uri:img}} />
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
    // marginTop: StatusBar.currentHeight,
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


export default ListAddScreen;