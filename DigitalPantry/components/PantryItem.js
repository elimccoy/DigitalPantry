import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

const PantryItem = ({item, numColumns}) => {

  return(
    <View style={styles.container}>
      <Text>Pantry Item:  {item.key} </Text>
      <Text>Unit: {item.unit}</Text>
      <Text>Amount: {item.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'gray'
  }
});

export default PantryItem;