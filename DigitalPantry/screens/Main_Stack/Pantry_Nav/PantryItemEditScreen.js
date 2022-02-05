import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, TextInput, Button, Subheading, Paragraph } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from '../LoadingScreen';
import { useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../../../store/slices/pantry';

const PantryItemEditScreen = ({ route, navigation }) => {

  //Redux data
  const dispatch = useDispatch();

  const [curItem, setCurItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, onChangeName] = useState('');
  const [unit, onChangeUnit] = useState('');
  const [amount, onChangeAmount] = useState('');
  const [remaining, setRemaining] = useState('');
  const [buttonsActive, setButtonsActive] = useState([false, false, false]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [imgURI, setImgURI] = useState('');

  //Did mount:
  useEffect(() => {
    if(route.params !== undefined)
    {
      //Load passed item data.
      let { passedItem } = route.params; 
      setCurItem(passedItem);
      onChangeName(passedItem.name);
      onChangeUnit(passedItem.unit);
      onChangeAmount(passedItem.amount);
      setRemaining(passedItem.percentage)
      setImgURI(passedItem.image)

      //Determine current percentage.
      if(passedItem.remaining === 'Full') {
        setButtonsActive([false, false, true]);
      }
      else if(passedItem.remaining === 'Half') {
        setButtonsActive([false, true, false]);
      }
      else if(passedItem.remaining === 'Low') {
        setButtonsActive([true, false, false]);
      }
      setIsLoaded(true);
    }
  }, [route.params]);

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
      expirationDate: null
    };
    itemToReturn.name = name;
    itemToReturn.key = curItem.key;
    itemToReturn.unit = unit;
    itemToReturn.amount = amount;
    itemToReturn.image = imgURI;
    itemToReturn.brand = curItem.brand;
    itemToReturn.description = curItem.description;
    itemToReturn.remaining = remaining;
    itemToReturn.expirationDate = date;
    
    dispatch(updateItem(itemToReturn));
    navigation.navigate('PantryScreen');
  }

  const handleDete = () => {
    dispatch(deleteItem(curItem.key));
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

  if(isLoaded) {
    return(
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-evenly' }}>
          <Avatar.Image size={128} style={styles.avatarStyles} source={{uri:curItem.image}} />
          <TextInput
            label="Name:"
            onChangeText={onChangeName}
            defaultValue={curItem.name}
          />
          <TextInput
            label="Unit:"
            onChangeText={onChangeUnit}
            defaultValue={curItem.unit}
          />
          <TextInput
            label="Amount:"
            onChangeText={onChangeAmount}
            defaultValue={curItem.amount}
          />
          <Subheading style={styles.timeRemainingText}>Set Amount Remaining:</Subheading>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.buttonContainer}>
              <Button 
                mode="contained" 
                onPress={() => pressRemainingButton(0, "Low")}
                disabled={buttonsActive[0]}>
                Low
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button 
                mode="contained" 
                onPress={() => pressRemainingButton(1, "Half")}
                disabled={buttonsActive[1]}>
                Half
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button 
                mode="contained" 
                onPress={() => pressRemainingButton(2, "Full")}
                disabled={buttonsActive[2]}>
                Full
              </Button>
            </View>
          </View>
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
          <View style={{ flexDirection: 'row' }}>
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
  } else {
    return(<LoadingScreen/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: 'center',
  },
  inputContainer: {
    justifyContent: 'space-evenly',
  },
  image: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  confirmationContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    flex: 1,
    padding: 10,
  },
  expirationDateButton: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  expirationDateText: {
    paddingTop: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    flex: 1, 
    padding: 10
  },
  timeRemainingText: {
    padding: 10
  },
  avatarStyles: {
    alignSelf: 'center',
    marginBottom: 10
  }
});

export default PantryItemEditScreen;