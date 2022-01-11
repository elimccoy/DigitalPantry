import { StyleSheet, Text, View } from 'react-native';

const ShopingListScreen = () => {

  return(
    <View style={styles.container}>
      <Text>Shopping List Screen!</Text>
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

export default ShopingListScreen;