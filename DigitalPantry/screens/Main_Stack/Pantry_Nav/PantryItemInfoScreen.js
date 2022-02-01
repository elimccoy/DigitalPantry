import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Title, Avatar, Paragraph  } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import LoadingScreen from '../LoadingScreen';

const PantryItemInfoScreen = ({ route, navigation }) => {
 
  const [item, setItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  //Did mount:
  useEffect(() => {
    if(route.params !== undefined)
    {
      let { passedItem } = route.params; 
      setItem(passedItem);
      setIsLoaded(true);
    }
  }, []);

  if(isLoaded)
  {
    return(
      <ScrollView style={styles.container}>
        <Avatar.Image 
          size={128} 
          style={{ alignSelf: 'center', marginTop: 30 }} 
          source={{uri:item.image}} />
        <Title>Name:</Title>
        <Paragraph>{item.name}</Paragraph>
        <Title>Amount:</Title>
        <Paragraph>{item.amount}</Paragraph>
        <Title>Unit of measurement:</Title>
        <Paragraph>{item.unit}</Paragraph>
        <Title>Brand:</Title>
        <Paragraph>{item.brand}</Paragraph>
        <Title>Description:</Title>
        <Paragraph>{item.description}</Paragraph>
        <Title>Percentage:</Title>
        <Paragraph>{item.percentage + "%"}</Paragraph>
      </ScrollView>
    ); 
  } 
  else 
  {
    return(<LoadingScreen/>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 10
  }
});

export default PantryItemInfoScreen;