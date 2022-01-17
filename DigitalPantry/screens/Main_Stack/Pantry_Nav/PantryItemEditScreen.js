import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import LoadingScreen from '../LoadingScreen';

const PantryItemEditScreen = ({ route, navigation }) => {
  
  const [curItem, setCurItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [unit, onChangeUnit] = useState('');
  const [amount, onChangeAmount] = useState('');
 
  useEffect(() => {
    if(route.params !== undefined)
    {
      let { passedItem } = route.params; 
      setCurItem(passedItem);
      setIsLoaded(true);
    }
  });

  const handleConfirm = () => {

    let itemToReturn = {
      key:'na',
      unit: 'na',
      amount: 'na'
    };
    itemToReturn.key = curItem.key;
    itemToReturn.unit = unit;
    itemToReturn.amount = amount;
    navigation.navigate('PantryScreen', {item:itemToReturn});
  }

  if(isLoaded) {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Product Name: {curItem.key}</Text>
        <Text>Unit:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUnit}
          value={unit}
        />
        <Text>Amount:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAmount}
          value={amount}
        />
        <Button
          title='Confirm'
          onPress={() => handleConfirm()}
        />
      </View>
    );
  } else {
    return(<LoadingScreen/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 30,
    fontWeight: '700'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default PantryItemEditScreen;