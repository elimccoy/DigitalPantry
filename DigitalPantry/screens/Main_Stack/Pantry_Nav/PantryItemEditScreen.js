import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, TextInput, Button, Subheading, Paragraph } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../../../store/slices/pantry';
import DropDown from "react-native-paper-dropdown";

const PantryItemEditScreen = ({ route, navigation }) => {

  //Redux data
  const item = useSelector((state) => state.pantry.ingredients.find((i) => (i.key == route.params.key)));
  const dispatch = useDispatch();

  const [name, onChangeName] = useState(item.name);
  const [unit, setUnit] = useState(item.unit);
  const [amount, onChangeAmount] = useState(item.amount);
  const [remaining, setRemaining] = useState(item.remaining);
  const [buttonsActive, setButtonsActive] = useState([false, false, false]);
  const [date, setDate] = useState(item.expirationDate);
  const [category, setCategory] = useState(item.category);
  const [show, setShow] = useState(false);
  const[showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const[showMultiSelectDropDownCategory, setShowMultiSelectDropDownCategory] = useState(false);
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

  const categoryList = [
    {
      label: "Test Category 1",
      value: "Test Category 1",
    },
    {
      label: "Test Category 2",
      value: "Test Category 2",
    },
    {
      label: "Test Category 3",
      value: "Test Category 3",
    },
  ];

  useEffect(() => {
    //Check to see what button should be active.
    if(item.remaining === "Full") {
      setButtonsActive([false, false, true]);
    } else if(item.remaining === "Half") {
      setButtonsActive([false, true, false]);
    } else if(item.remaining === "Low") {
      setButtonsActive([true, false, false]);
    }
  }, [item.remaining]);

  const handleConfirm = () => {

    let itemToReturn = {
      key:'na',
      name: 'na',
      unit: 'na',
      amount: 'na',
      image: 'na',
      brand:'na',
      description:'na',
      remaining:'na',
      expirationDate: null,
    };

    itemToReturn.name = name;
    itemToReturn.key = item.key;
    itemToReturn.unit = unit;
    itemToReturn.amount = amount;
    itemToReturn.image = item.image;
    itemToReturn.brand = item.brand;
    itemToReturn.description = item.description;
    itemToReturn.remaining = remaining;
    itemToReturn.expirationDate = date;
    itemToReturn.category = category;

    dispatch(updateItem(itemToReturn));
    navigation.navigate('PantryScreen');
  }

  const handleDete = () => {
    dispatch(deleteItem(item.key));
    navigation.navigate('PantryScreen');
  }

  const pressRemainingButton = (buttonNum, rema) => {

    //Mark button.
    let buttonUpdate = [false, false, false];
    buttonUpdate[buttonNum] = true;

    //Update buttons and percent.
    setButtonsActive(buttonUpdate);
    setRemaining(rema);
  }

  const handleDateSelect = (event, date) => {
    setShow(false);
    setDate(date);
  }


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Avatar.Image size={128} style={styles.avatarStyles} source={{ uri: item.image }} />
        <TextInput
          label="Name:"
          mode={"outlined"}
          onChangeText={onChangeName}
          defaultValue={item.name}
        />
        <TextInput
          label="Amount:"
          mode={"outlined"}
          keyboardType = 'numeric'
          onChangeText={onChangeAmount}
          defaultValue={item.amount}
        />
        <DropDown
          label={"Measurements"}
          mode={"outlined"}
          visible={showMultiSelectDropDown}
          showDropDown={() => setShowMultiSelectDropDown(true)}
          onDismiss={() => setShowMultiSelectDropDown(false)}
          value={unit}
          setValue={(res) => { setUnit(res) }}
          list={measurementList}
        />
        <DropDown
          label={"Category"}
          mode={"outlined"}
          visible={showMultiSelectDropDownCategory}
          showDropDown={() => setShowMultiSelectDropDownCategory(true)}
          onDismiss={() => setShowMultiSelectDropDownCategory(false)}
          value={category}
          setValue={(res) => {setCategory(res)}}
          list={categoryList}
        />
        <Subheading style={styles.timeRemainingText}>Set Amount Remaining:</Subheading>
        <View style={styles.flexRow}>
          <View style={styles.buttonContainerNoTopPadding}>
            <Button
              mode="contained"
              onPress={() => pressRemainingButton(0, "Low")}
              disabled={buttonsActive[0]}>
              Low
            </Button>
          </View>
          <View style={styles.buttonContainerNoTopPadding}>
            <Button
              mode="contained"
              onPress={() => pressRemainingButton(1, "Half")}
              disabled={buttonsActive[1]}>
              Half
            </Button>
          </View>
          <View style={styles.buttonContainerNoTopPadding}>
            <Button
              mode="contained"
              onPress={() => pressRemainingButton(2, "Full")}
              disabled={buttonsActive[2]}>
              Full
            </Button>
          </View>
        </View>
        <Paragraph style={styles.expirationDateText}>Expiration Date: {date.toString().slice(0, 16)}</Paragraph>
        <View style={styles.expirationDateButton}>
          <Button icon="calendar" mode="contained" onPress={() => setShow(true)}>
            Set expiration date
          </Button>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={date}
            is24Hour={false}
            display="default"
            onChange={handleDateSelect}
          />
        )}
        <View style={styles.flexRow}>
          <View style={styles.buttonContainer}>
            <Button icon="check" mode="contained" onPress={() => handleConfirm()}>
              Done
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button icon="delete" mode="contained" onPress={() => handleDete()}>
              Delete
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },
  inputContainer: {
    justifyContent: 'space-evenly',
  },
  expirationDateButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  expirationDateText: {
    paddingTop: 3,
    textAlign: 'center',
  },
  buttonContainerNoTopPadding: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  timeRemainingText: {
    padding: 2,
  },
  avatarStyles: {
    alignSelf: 'center',
    marginBottom: 7,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default PantryItemEditScreen;