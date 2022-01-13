import { StyleSheet, Text, View } from 'react-native';

const PantryItem = () => {
  return(
    <View style={styles.container}>
      <Text>Pantry Item</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A9A9A9',
    height: 200,
    width: 200,
    margin: 4
  }
});

export default PantryItem;