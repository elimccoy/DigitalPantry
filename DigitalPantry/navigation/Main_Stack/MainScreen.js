import { StyleSheet, Text, View, Button } from 'react-native';
import { getAuth } from 'firebase/auth'

const MainScreen = () => {

  const auth = getAuth();

  const signOut = () => {
    auth.signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }

  return(
    <View style={styles.container}>
      <Text>MainScreen</Text>
      <Button
      title="Log-Out"
      onPress={() => {
        signOut()
        }}
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