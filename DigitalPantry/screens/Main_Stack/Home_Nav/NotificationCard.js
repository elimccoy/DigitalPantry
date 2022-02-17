import { StyleSheet } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';

const NotificationCard = ({ type, content, cancel }) => {
  return (
    <Card style={styles.card}>
      <Card.Title title={type} />
      <Card.Content>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => cancel()}>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default NotificationCard;
