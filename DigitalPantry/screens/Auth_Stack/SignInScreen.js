import { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { Button, Text, View } from 'react-native';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import styles from '../../styles/SignInScreenStyles'

const SignInScreen = () => {

  //Get user Google account token.
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '957242178167-l7u7cvcautet1mbsb49arrhhbnrdho3e.apps.googleusercontent.com',
      },
  );

  useEffect(() => {
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
      <Text style={styles.text}>Sign In Screen!</Text>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {promptAsync();}}
      />
    </View>
  );
}

export default SignInScreen;