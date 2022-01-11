import { StyleSheet, Text, ScrollView } from 'react-native';
import ProductItem from './ProductItem'

const ProductList = () => {

  return(
    <ScrollView style={styles.container}  contentContainerStyle={{ justifyContent: 'center' }}>
      <ProductItem/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem/>
      <ProductItem/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#949494'
  }
});

export default ProductList;