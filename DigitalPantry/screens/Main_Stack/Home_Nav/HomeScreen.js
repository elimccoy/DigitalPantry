import moment from 'moment';
import { StyleSheet, Text, ScrollView, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import NotificationCard from './NotificationCard.js';
import { deleteNotification } from '../../../store/slices/notifications';
import { getAuth } from "firebase/auth";
import { addItem } from '../../../store/slices/shoppingList';

const HomeScreen = () => {
  const notifications = useSelector((state) => state.notifications.notifications);
  const ingredients = useSelector((state) => state.pantry.ingredients);
  const shoppingList = useSelector((state) => state.shoppingList.list);
  const dispatch = useDispatch();

  const auth = getAuth();

  const expiredItemNotificiations = ingredients
    .filter(({ key, expirationDate }) =>
      (moment(expirationDate).diff(Date.now(), 'days') < 7) &&
      !(shoppingList.find((listItem) => listItem.key === key))
    )
    .map((ingredient) => ({
    id: `shopping_list_suggestion_${ingredient.key}`,
    type: 'shopping_list_suggestion',
    title: false,
    contents: `Your ${ingredient.name} is expiring within a week. Would you like to add it to your shopping list?`,
    actions: [{
      name: 'Add',
      handler: () => {
        dispatch(addItem({
          ...ingredient,
          amount: 1,
        }));
      },
    }],
  }));

  const signOut = () => {
    auth.signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  const allNotifications = [...expiredItemNotificiations, ...notifications];

  return(
    <ScrollView style={styles.container}>
      {allNotifications.map((notification) =>
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
});

export default HomeScreen;