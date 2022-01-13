import { StyleSheet, Text, View } from 'react-native';

const ShoppingScreen = () => {
  return(
    <View style={styles.container}>
      <Text>Shopping Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red'
  }
});

export default ShoppingScreen;