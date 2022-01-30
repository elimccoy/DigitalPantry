import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, TextInput, Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from '../LoadingScreen';

const PantryItemEditScreen = ({ route, navigation }) => {
  
  const [curItem, setCurItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, onChangeName] = useState('');
  const [unit, onChangeUnit] = useState('');
  const [amount, onChangeAmount] = useState('');
  const [imgURI, setImgURI] = useState('');
 
  //Did mount:
  useEffect(() => {
    if(route.params !== undefined)
    {
      let { passedItem } = route.params; 
      setCurItem(passedItem);
      onChangeName(passedItem.name);
      onChangeUnit(passedItem.unit);
      onChangeAmount(passedItem.amount);
      setImgURI(passedItem.image)
      setIsLoaded(true);
    }
  }, []);

  const handleConfirm = () => {

    let itemToReturn = {
      key:'na',
      name: 'na',
      unit: 'na',
      amount: 'na', 
      image: 'na'
    };
    itemToReturn.name = name;
    itemToReturn.key = curItem.key;
    itemToReturn.unit = unit;
    itemToReturn.amount = amount;
    itemToReturn.image = imgURI;
    navigation.navigate('PantryScreen', {item:itemToReturn});
  }

  if(isLoaded) {
    return(
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-evenly' }}>
          <Avatar.Image size={128} style={{ alignSelf: 'center', marginBottom: 10 }} source={{uri:curItem.image}} />
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
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <View style={{ flex: 1, padding: 10 }}>
              <Button icon="check" mode="contained" onPress={() => handleConfirm()}>
                Done
              </Button>
            </View>
            <View style={{ flex: 1, padding: 10 }}>
              <Button icon="delete" mode="contained" onPress={() => handleConfirm()}>
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
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '700'
  },
});

export default PantryItemEditScreen;