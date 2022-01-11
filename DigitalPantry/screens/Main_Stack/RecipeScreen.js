import { StyleSheet, Text, View } from 'react-native';

const RecipeScreen = () => {

  return(
    <View style={styles.container}>
      <Text>Recipe Screen!</Text>
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

export default RecipeScreen;