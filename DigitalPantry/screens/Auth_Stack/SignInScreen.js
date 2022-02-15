import { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { View, Image } from 'react-native';
import { Button } from 'react-native-paper';
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
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return(
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/digitalPantryLogo.png')}
      />
      <Button 
        icon="google" 
        style={styles.buttonStyle}
        mode="contained" 
        onPress={() => promptAsync()}>
        Sign-in with Google
      </Button>
      <Button 
        icon="apple" 
        style={styles.buttonStyle}
        mode="contained" 
        onPress={() => promptAsync()}>
        Sign-in with Apple
      </Button>
    </View>
  );
}

export default SignInScreen;