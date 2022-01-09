import * as React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as firebase from '../../firebase'
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";

const SignInScreen = () => {

  const signOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    });
  }

  //Get user Google account token.
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '957242178167-l7u7cvcautet1mbsb49arrhhbnrdho3e.apps.googleusercontent.com',
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return(
    <View style={styles.container}>
      <Text>Sign In Screen!</Text>
      <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
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

export default SignInScreen;