import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

var numColumnsGlobal;

const PantryItem = ({item, numColumns}) => {

  numColumnsGlobal = numColumns;

  return(
    <View style={styles.container}>
      <Text>Pantry Item: {item.key} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9A9A9',
    flex:1,
    margin: 5,
    borderRadius: 10,
    height: Dimensions.get('window').width / numColumnsGlobal, // approximate a square

  }
});

export default PantryItem;