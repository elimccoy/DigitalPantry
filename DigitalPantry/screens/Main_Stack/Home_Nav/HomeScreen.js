import { StyleSheet, Text, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Example_Notifications = [{
  id: 1,
  type: 'recipe_suggestion',
  content: 'You should make eggs for breakfast. You have 18 eggs expiring tomorrow',
}, {
  id: 2,
  type: 'shopping_list_suggestion',
  content: 'You have spaghetti scheduled for today and are missing Ingredients. Would you like to add them to your shoping list?',
}];

const NotificationCard = ({ type, content }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={type} />
      <Card.Content>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  )
}

const HomeScreen = () => {
  return(
    <ScrollView style={styles.container}>
      {Example_Notifications.map((notification) =>
        <NotificationCard key={notification.id} {...notification} />
      )}
    </ScrollView>
  );
}

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