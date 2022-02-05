import { StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NotificationCard from './NotificationCard.js';
import { deleteNotification } from '../../../store/slices/notifications';

const HomeScreen = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const dispatch = useDispatch();

  return(
    <ScrollView style={styles.container}>
      {notifications.map((notification) =>
        <NotificationCard
          key={notification.id}
          {...notification}
          cancel={() => dispatch(deleteNotification(notification.id))}
        />
      )}
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