import { Text } from 'react-native';
import {List, IconButton} from 'react-native-paper';
import * as React from 'react';
/**TO-DO
 * Styling: change '+' color
 * Display units
 * */

const SuggestedItem = ({ item, addItem }) => { //takes in function addItem and also item
  return (
    <List.Item
      title={item.name}
      description={item.data}
      left={() => (
        <IconButton
          icon="plus-circle"
          size={20}
          onPress={() => addItem(item)}
        />
      )}
      right={() => (
        <Text>{item.amount}</Text>
      )}
    />
  );
};

export default SuggestedItem;