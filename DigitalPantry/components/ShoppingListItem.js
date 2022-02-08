import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { List, Checkbox} from 'react-native-paper';

/**
 * Display units
 * Styling
 */
const ShoppingListItem = ({item}) => {
  const [checked, setChecked] = React.useState(false);

  return (
      <List.Item
        title={item.name}
        description={item.data}
        left={() => (
          <Checkbox.Android
            disabled={false}
            color={"blue"}
            uncheckedColor='grey'
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
          />
        )}
        right={() => (
          <Text> {item.amount} </Text>
        )}
      />
  );
};

export default ShoppingListItem;