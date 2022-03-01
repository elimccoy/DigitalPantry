import { StyleSheet } from 'react-native';
import { Button, Card, Paragraph } from 'react-native-paper';

const NotificationCard = ({ type, title, contents, cancel, actions = [] }) => {
  console.log(actions);
  return (
    <Card style={styles.card}>
      {title && <Card.Title title={title} />}
      <Card.Content>
        <Paragraph>{contents}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => cancel()}>Cancel</Button>
        {actions.map(({name, handler}) => (
          <Button key={name} onPress={handler}>{name}</Button>
        ))}
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
