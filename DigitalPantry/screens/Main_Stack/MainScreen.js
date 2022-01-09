import { StyleSheet, Text, View, Button } from 'react-native';
import { loggingOut } from '../../API/firebaseMethods';
import { getAuth } from 'firebase/auth';

const MainScreen = () => {

  let auth = getAuth();
  let currentUserUID = auth.currentUser.uid;

  return(
    <View style={styles.container}>
      <Text>MainScreen, UID: {currentUserUID}</Text>
      <Button
        title="Log-Out"
        onPress={() => {loggingOut()}}
      />
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