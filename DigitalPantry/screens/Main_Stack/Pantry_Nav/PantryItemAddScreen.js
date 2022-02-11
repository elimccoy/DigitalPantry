import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Avatar, Button, Paragraph } from 'react-native-paper';
import { fetch_upc } from '../../../API/barcodeSpider';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createItem } from '../../../store/slices/pantry';
import LoadingScreen from '../LoadingScreen';
import DropDown from "react-native-paper-dropdown";

const PantryItemAddScreen = ({ route, navigation }) => {

  //Redux data
  //const data = useSelector((state) => state.pantry.ingredients);
  const dispatch = useDispatch();

  const[name, setName] = React.useState("Unknown");
  const[key, setKey] =  React.useState("Unknown");
  const[unit, setUnit] =  React.useState("");
  const[amount, setAmount] =  React.useState("Unknown");
  const[imgURI, setImgURI] =  React.useState("Unknown");
  const[brand, setBrand] = React.useState("Unknown");
  const[desc, setDesc] = React.useState("Unknown");
  const[date, setDate] = React.useState(new Date());
  const[show, setShow] = React.useState(false);
  const[showMultiSelectDropDown, setShowMultiSelectDropDown] = React.useState(false);
  const[isLoaded, setIsLoaded] = React.useState(false);
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

  //Did mount:
  React.useEffect(() => {
    //Handle incoming data (either new data or edited data.)
    if(route.params !== undefined) {
      let { upc } = route.params; //Get data from route;

      //Connect to API here!
      fetch_upc(upc).then((itemAPIData) => {

        if(itemAPIData["item_response"].code !== "200") {
          //Record data.
          setName(itemAPIData["item_attributes"].title);
          setKey(upc);
          setUnit("");
          setAmount("NA");
          setImgURI(itemAPIData["item_attributes"].image);
          if(itemAPIData["item_attributes"].brand !== "") setBrand(itemAPIData["item_attributes"].brand);
          if(itemAPIData["item_attributes"].description !== "") setDesc(itemAPIData["item_attributes"].description);
          setIsLoaded(true);
        } else {
          alert("Item does not exist in our database! Please try again.");
          navigation.navigate("PantryScreen");
        }
      });
    }
  }, [route.params]);

  //Handels date selected.
  const handleDateSelect = (event, date) => {
    setShow(false);
    setDate(date);
  }

  //Handlers for navigating:
  const donePressHandler = () => {

    //Create new Item data.
    let data = {
      name: name,
      key: key,
      unit: unit,
      amount: amount,
      image: imgURI,
      brand: brand,
      description: desc,
      remaining: 'Full',
      expirationDate: date,
    }

    //Add to redux.
    dispatch(createItem(data));

    navigation.navigate('PantryScreen');
  }

  const morePressHandler = () => {
    navigation.navigate('BarcodeScreen');
  }

  if (isLoaded) {
    return (
      <View style={styles.container}>
        <Avatar.Image size={128} style={styles.avatarStyle} source={{uri:imgURI}}/>
        {/*Container for text inputs*/}
        <View style={styles.inputContainer}>
          <TextInput
            label="Add Item Name"
            mode="outlined"
            defaultValue={name}
            onChangeText={name => setName(name)}
          />
          <TextInput
            label="Amount"
            mode="outlined"
            keyboardType = 'numeric'
            defaultValue={amount}
            onChangeText={amount => setAmount(amount)}
          />
          <DropDown
            label={"Measurements"}
            mode={"outlined"}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={unit}
            setValue={(res) => {setUnit(res)}}
            list={measurementList}
          />
          <Paragraph style={styles.expirationDateText}>Expiration Date: {date.toString().slice(0,16)}</Paragraph>
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
        </View>
        <View style={styles.buttonViewStyle}>
          <View style={styles.buttonPaddingStyle}>
            <Button
              icon="check"
              mode="contained"
              onPress={() => donePressHandler()}>
              Done
            </Button>
          </View>
          <View style={styles.buttonPaddingStyle}>
            <Button
              icon="camera"
              mode="contained"
              onPress={() => morePressHandler()}>
              Re-Scan
            </Button>
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
    padding: 10
  },
  buttonPaddingStyle: {
    flex: 1,
    padding: 10,
  },
  buttonViewStyle: {
    flexDirection: 'row',
    padding: 10,
  },
  expirationDateButton: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  expirationDateText: {
    paddingTop: 10,
    textAlign: 'center',
  },
  avatarStyle: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  });

export default PantryItemAddScreen;