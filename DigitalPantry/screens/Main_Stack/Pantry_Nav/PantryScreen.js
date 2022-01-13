import { StyleSheet, Text, ScrollView } from 'react-native';
import PantryItem from '../../../components/PantryItem';
import { StatusBar } from 'expo-status-bar';

const PantryScreen = () => {
  return(
    <ScrollView style={styles.container}>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <PantryItem/>
      <StatusBar style="light" translucent={false} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});

export default PantryScreen;