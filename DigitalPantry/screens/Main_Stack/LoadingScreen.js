/**
 * Name: LoadingScreen.js
 * Desc: React native screen to show the loading progress of a specific page.
 * File type: Screen
*/

import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingScreen = () => {
  return(
    <View style={styles.container}>
      <ActivityIndicator animating={true} size='large'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingScreen;