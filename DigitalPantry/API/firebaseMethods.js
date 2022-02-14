import { collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { db } from '../firebase';

export async function loggingOut() {
  const auth = getAuth();
  auth.signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
};