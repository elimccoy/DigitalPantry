import { StyleSheet, Text, View } from 'react-native';

const PantryScreen = () => {
  return(
    <View style={styles.container}>
      <Text>Pantry Screen!</Text>
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

export default PantryScreen;