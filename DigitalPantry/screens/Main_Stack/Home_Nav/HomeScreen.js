import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NotificationCard from './NotificationCard.js';
import { deleteNotification } from '../../../store/slices/notifications';
import { getAuth } from "firebase/auth";

const HomeScreen = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();

  const auth = getAuth();

  const signOut = () => {
    auth.signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  return(
    <ScrollView style={styles.container}>
      {notifications.map((notification) =>
        <NotificationCard
          key={notification.id}
          {...notification}
          cancel={() => dispatch(deleteNotification(notification.id))}
        />,
      )}
      <Button
        onPress={() => {signOut()}}
        title="Sign Out"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default HomeScreen;