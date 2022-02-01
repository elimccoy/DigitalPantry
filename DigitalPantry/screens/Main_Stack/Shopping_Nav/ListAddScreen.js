import { StyleSheet, View, Button, ScrollView } from 'react-native';
import * as React from 'react';
import { TextInput } from 'react-native-paper';

/**TO-DO
 * finish implementing cancel
 * change keys (hard coded for now)
 * Styling: make it more similar to pantry edit screen
 */
const ListAddScreen = ({navigation}) => {
    const [itm, setItm] = React.useState({});
    const [itmName, setItmName] = React.useState("");
    const [amt, setAmt] = React.useState("");
    const [units, setUnits] = React.useState("");
    const [key, setKey] = React.useState("")


  const cancel = () =>{
    navigation.navigate('ShoppingScreen'); 
  }

  //adds item to list
  const add = () =>{
    let amtInt = parseInt(amt); 
    let k = (amtInt * 3).toString();
    setKey(k)
    var newItm = {key: k, amount: amt, name: itmName, data: units}; //make object
   
    setItm({key: key, amount: amt, name: itmName, data: units});
    navigation.navigate('ShoppingScreen', {newItem:newItm}); //pass object to ShoppingScreen to be added
  };
  
     
  

  return(
  
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



export default ListAddScreen;