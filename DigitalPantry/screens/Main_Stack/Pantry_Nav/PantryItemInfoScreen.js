/**
 * Name: PantryItemInfoScreen.js
 * Desc: React native screen that allows the to view more details about the pantry item selected.
 * File type: Screen
*/

import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Title, Avatar, Paragraph  } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';

const PantryItemInfoScreen = ({ route, navigation }) => {

  //Redux data:
  const item = useSelector((state) => state.pantry.ingredients.find((i) => (i.key == route.params.key)));

  return(
    <ScrollView style={styles.container}>
      <Avatar.Image
        size={128}
        style={styles.image}
        source={{uri:item.image}} />
      <Title>Name:</Title>
      <Paragraph>{item.name}</Paragraph>
      <Title>Expiration date:</Title>
      <Paragraph>{item.expirationDate.toString().slice(0,16)}</Paragraph>
      <Title>Amount:</Title>
      <Paragraph>{item.amount}</Paragraph>
      <Title>Unit of measurement:</Title>
      <Paragraph>{item.unit}</Paragraph>
      <Title>Brand:</Title>
      <Paragraph>{item.brand}</Paragraph>
      <Title>Description:</Title>
      <Paragraph>{item.description}</Paragraph>
      <Title>Remaining:</Title>
      <Paragraph>{item.remaining}</Paragraph>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 10,
  },
  image: {
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default PantryItemInfoScreen;