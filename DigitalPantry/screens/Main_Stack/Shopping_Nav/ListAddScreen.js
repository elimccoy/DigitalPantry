import { StyleSheet, View, Button} from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';

/**TO-DO
 * finish implementing cancel
 * change keys (hard coded for now)
 * Styling: make it more similar to pantry edit screen
 */
const ListAddScreen = ({ navigation }) => {
  const [itm, setItm] = useState({});
  const [itmName, setItmName] = useState('');
  const [amt, setAmt] = useState('');
  const [units, setUnits] = useState('');
  const [key, setKey] = useState('')

  //adds item to list
  const add = () => {
    const amtInt = parseInt(amt);
    const k = (amtInt * 3).toString();
    setKey(k);
    const newItm = { key: k, amount: amt, name: itmName, data: 'idk' }; //make object

    setItm({ key: key, amount: amt, name: itmName, data: units });
    navigation.navigate('ShoppingScreen', { newItem: newItm }); //pass object to ShoppingScreen to be added
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label='Product Name'
        value={itmName}
        onChangeText={itmName => setItmName(itmName)}
      />

      <TextInput
        style={styles.input}
        label='Unit'
        value={units}
        onChangeText={units => setUnits(units)}
      />

      <TextInput
        style={styles.input}
        label='Amount'
        value={amt}
        onChangeText={amt => setAmt(amt)}
      />

      <Button
        title='Confirm'
        onPress={() => add()}
      />
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 17,
    borderWidth: 1,
    padding: 10,
  },
});


export default ListAddScreen;