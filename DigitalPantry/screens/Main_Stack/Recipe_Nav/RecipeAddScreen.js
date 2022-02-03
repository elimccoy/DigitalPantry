import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';

const RecipeAddScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent={false} backgroundColor='white' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
});

export default RecipeAddScreen;