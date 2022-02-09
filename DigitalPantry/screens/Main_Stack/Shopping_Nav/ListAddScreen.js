import { StyleSheet, View, Button} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { addItem } from '../../../store/slices/shoppingList';

/**TO-DO
 * finish implementing cancel
 * change keys (hard coded for now)
 * Styling: make it more similar to pantry edit screen
 */
const ListAddScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [itmName, setItmName] = useState('');
  const [amt, setAmt] = useState('');
  const [units, setUnits] = useState('');

  const confirm = () => {
    dispatch(addItem({
      amount: amt,
      name: itmName,
      data: units,
    }));

    navigation.navigate('ShoppingScreen'); // return to shopping screen
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
        onPress={confirm}
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