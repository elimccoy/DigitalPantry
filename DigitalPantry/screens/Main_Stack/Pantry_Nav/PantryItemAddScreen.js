import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Avatar, Button, Paragraph } from 'react-native-paper';
import { fetch_upc } from '../../../API/barcodeSpider';
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingScreen from '../LoadingScreen';

const PantryItemAddScreen = ({ route, navigation }) => {

  const[name, setName] = React.useState("Unknown");
  const[key, setKey] =  React.useState("Unknown");
  const[unit, setUnit] =  React.useState("Unknown");
  const[amount, setAmount] =  React.useState("Unknown");
  const[imgURI, setImgURI] =  React.useState("Unknown");
  const[brand, setBrand] = React.useState("Unknown");
  const[desc, setDesc] = React.useState("Unknown");
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const[isLoaded, setIsLoaded] = React.useState(false);

  //Did mount:
  React.useEffect(() => {
    //Handle incoming data (either new data or edited data.)
    if(route.params !== undefined) {
      let { upc } = route.params; //Get data from route;

      //Connect to API here!
      fetch_upc(upc).then((itemAPIData) => {

        //Record data.
        setName(itemAPIData["item_attributes"].title);
        setKey(upc);
        setUnit("NA");
        setAmount("NA");
        setImgURI(itemAPIData["item_attributes"].image);
        if(itemAPIData["item_attributes"].brand !== "") setBrand(itemAPIData["item_attributes"].brand);
        if(itemAPIData["item_attributes"].description !== "") setDesc(itemAPIData["item_attributes"].description);
        setIsLoaded(true);
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
      expirationDate: date
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
        <Avatar.Image size={128} style={styles.avatarStyle} source={{uri:imgURI}}/>
        {/*Container for text inputs*/}
        <View style={styles.inputContainer}>
          <TextInput
            label="Add Item Name"
            defaultValue={name}
            onChangeText={name => setName(name)}
          />
          <TextInput
            label="Quantity"
            defaultValue={amount}
            onChangeText={amount => setAmount(amount)}
          />
          <TextInput
            label="Unit(s)"
            defaultValue={unit}
            onChangeText={unit => setUnit(unit)}
          />
          <Paragraph style={styles.expirationDateText}>Expiration Date: {date.toString().slice(0,16)}</Paragraph>
          <View style={styles.expirationDateButton}>
            <Button icon="check" mode="contained" onPress={() => setShow(true)}>
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
  },
  buttonPaddingStyle: {
    flex: 1, 
    padding: 10
  },
  buttonViewStyle: {
    flexDirection: 'row',
    padding: 10 
  },
  expirationDateButton: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  expirationDateText: {
    paddingTop: 10,
    textAlign: 'center'
  },
  avatarStyle: {
    alignSelf: 'center', 
    marginBottom: 10
  }
  });

export default PantryItemAddScreen;