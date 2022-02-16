import { StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import { editItem, deleteItem } from '../../../store/slices/shoppingList';

/**TO-DO
 * Styling: make it more similar to pantry edit screen
 */
const ListEditDeleteScreen = ({ route, navigation }) => { //will take in functions
  const initialItem = route.params.itemToEdit;

  const dispatch = useDispatch();
  const [itmName, setItmName] = useState(initialItem.name);
  const [amt, setAmt] = useState(initialItem.amount);
  const [units, setUnits] = useState(initialItem.units);

  const _deleteItem = () => {
    dispatch(deleteItem(initialItem.key));
    navigation.navigate('ShoppingScreen');
  };

  const _editItem = () => {
    dispatch(editItem({
      key: initialItem.key,
      amount: amt,
      name: itmName,
      data: units,
      info: initialItem.info,
    }));

    navigation.navigate('ShoppingScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Product Name"
        value={itmName}
        onChangeText={itmName => setItmName(itmName)}
      />

      <TextInput
        style={styles.input}
        label="Unit"
        value={units}
        onChangeText={units => setUnits(units)}
      />

      <TextInput
        style={styles.input}
        label="Amount"
        value={amt}
        onChangeText={amt => setAmt(amt)}
      />

      <Button style={styles.button}
        title="Save changes"
        onPress={_editItem}
      />

      <Button style={styles.button}
        title="Delete Item"
        onPress={_deleteItem}
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

  button: {
    borderWidth: 1,
    padding: 30,
    margin: 17,
  },
});


export default ListEditDeleteScreen;