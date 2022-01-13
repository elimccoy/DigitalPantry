import { StyleSheet, Text, View, Button } from 'react-native';

const HomeScreen = () => {
  return(
    <View style={styles.container}>
      <Text>Home Screen!</Text>
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

export default HomeScreen;