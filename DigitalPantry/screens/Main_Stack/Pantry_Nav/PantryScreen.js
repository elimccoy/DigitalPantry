import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import PantryItem from '../../../components/PantryItem';

//Data is going to be each pantry item.
const data = [
  { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' },
  { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' },
  { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' },
  { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' },
  { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' },
  { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' }, { key: 'X' },
];

const numColumns = 2;

const PantryScreen = () => {

  const renderItem = ({ item, index }) => {
    return (
      <View>
       <PantryItem item={item} numColumns={numColumns}/>
      </View>
    );
  };
  return(
    <View style={styles.container}>
      <FlatList
      data={data}
      style={styles.scollContainer}
      renderItem={renderItem}
      numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 23
  },
  scollContainer:{
    flex: 1
  }
});

export default PantryScreen;