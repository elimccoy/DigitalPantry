import { StyleSheet, View, Text } from 'react-native';
import ProductList from '../../../components/ProductList';
import ScannerButton from '../../../components/ScannerButton';

const PantryScreen = ({ navigation }) => {
  return(
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Pantry Screen</Text>
      </View>
      <View style={styles.PantryListContainer}>
        <ProductList/>
        <ScannerButton navigation={navigation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginTop: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
  },
  PantryListContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});

export default PantryScreen;