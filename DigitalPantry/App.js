import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainScreen = ({navigation}) => {
  
  function onButton() {
    navigation.push("SettingsScreen");
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Basic Navigation with Stack Navigator!</Text>
      <Button onPress={() => {onButton()}} title="Go to Settings"/>
      <StatusBar style="auto" />
    </View>
  );
}

const SettingsScreen = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.textStyle}>This is the settings screen.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red'
  },
  textStyle: {
    color: 'grey',
    fontSize: 20,
    marginBottom: 10
  }
});
