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
      <Text style={styles.title}>Profile Screen!</Text>
      <Image
        style={styles.profileImage}
        source={{uri: userImageURI}}
      />
      <Text style={styles.text}>UID: {currentUserUID}</Text>
      <Text style={styles.text}>Display Name: {currentUser.displayName}</Text>
      <Text style={styles.text}>Email: {currentUser.email}</Text>
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
    width: 100,
    marginTop: 20
  },
  title: {
    fontWeight: '700',
    fontSize: 40,
  },
  text: {
    fontWeight: '400',
    fontSize: 20,
    marginTop: 20
  }
});

export default ProfileScreen;