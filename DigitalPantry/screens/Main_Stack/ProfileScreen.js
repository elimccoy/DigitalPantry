import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { loggingOut } from '../../API/firebaseMethods';
import { getAuth } from 'firebase/auth';

const ProfileScreen = () => {

  let auth = getAuth();
  let currentUserUID = auth.currentUser.uid;
  let currentUser = auth.currentUser;
  let userImageURI = currentUser.photoURL;

  return(
    <View style={styles.container}>
      <Text>Profile Screen!</Text>
      <Image
        style={styles.profileImage}
        source={{uri: userImageURI}}
      />
      <Text>UID: {currentUserUID}</Text>
      <Text>Display Name: {currentUser.displayName}</Text>
      <Text>Email: {currentUser.email}</Text>
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
  },
  profileImage: {
    height: 100,
    width: 100
  }
});

export default ProfileScreen;