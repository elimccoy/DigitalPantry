import { getAuth } from 'firebase/auth'

export async function loggingOut() {
  const auth = getAuth();
  auth.signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
}