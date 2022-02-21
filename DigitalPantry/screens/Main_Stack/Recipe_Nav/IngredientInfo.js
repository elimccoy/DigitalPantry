import react, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';


const [ingName, onChangeIng] = useState();
const [ingCount, onChangeCount] = useState();
const [ingUnit, onChangeUnit] = useState();

const ingData = {
  ingName: ingName,
  ingCount: ingCount,
  ingUnit: ingUnit,
}

export { ingData };

export function IngredientData() {

  return (

    <View style={styles.container}>
      <View style={styles.nameInput}>
        <TextInput
          style={styles.singlelineInput}

          onChangeText={onChangeIng}

          value={ingName}
          mode={'outlined'}
          label={'Ingredients'}
          placeholder="Ingredients"
        //inputAccessoryViewID="Done"
        />
      </View>
      <View style={styles.countInput}>
        <TextInput
          style={styles.singlelineInput}

          onChangeText={onChangeCount}

          value={ingCount}
          mode={'outlined'}
          label={'#'}
          placeholder="1/2"
        //inputAccessoryViewID="Done"
        />
      </View>
      <View style={styles.unitInput}>
        <TextInput
          style={styles.singlelineInput}

          onChangeText={onChangeUnit}

          value={ingUnit}
          mode={'outlined'}
          label={'Unit'}
          placeholder="Cups"
        //inputAccessoryViewID="Done"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameInput: {
    width: '57%',
  },
  countInput: {
    width: '20%',
  },
  unitInput: {
    width: '20%',
  },
  singlelineInput: {
    fontSize: 18,
  },
})