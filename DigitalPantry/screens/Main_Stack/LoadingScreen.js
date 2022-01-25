import { StyleSheet, Text, View, Button } from 'react-native';

const LoadingScreen = () => {
  return(
    <View style={styles.container}>
      <Text>Loading...</Text>
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

export default LoadingScreen;