import { StyleSheet, Text, View, Button } from 'react-native';

const PantryItemEditScreen = () => {
  return(
    <View style={styles.container}>
      <Text>Edit Item Screen Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default PantryItemEditScreen;