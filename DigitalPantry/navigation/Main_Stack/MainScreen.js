import { StyleSheet, Text, View } from 'react-native';

const MainScreen = () => {
  return(
    <View style={styles.container}>
      <Text>Sign In Screen!</Text>
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

export default MainScreen;