import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, FAB } from 'react-native-paper';
import ShoppingListItem from '../../../components/ShoppingListItem.js';
import SuggestedItem from '../../../components/SuggestedItem.js';
import { deleteItems, moveSuggestedToList } from '../../../store/slices/shoppingList';

/*TO-DO:
-implement delete all checked items function from the FAB
-display units for each item
*/

const ShoppingScreen = ({ route, navigation }) => {
  const listItems = useSelector((state) => state.shoppingList.list);
  const suggItems = useSelector((state) => state.shoppingList.suggested);
  const dispatch = useDispatch();

  const [showFab] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container} >
      <ScrollView style={styles.container}>
        <List.Section title="Shopping List" titleStyle={styles.listTitle}>
          {listItems.map((i) =>
            <TouchableOpacity
              onLongPress={() => {
                navigation.navigate('ListEditDeleteScreen', { itemToEdit: i })
              }}
              key={i.key}
            >
              <ShoppingListItem item={i} key={i.key} />
            </TouchableOpacity>)}
        </List.Section>

        <List.Section style={styles.listSection}>
          <List.Accordion title="Suggested Items" titleStyle={styles.listTitle} expanded={expanded} onPress={handlePress}>
            {suggItems.map((i) => (
              <SuggestedItem
                item={i}
                key={i.key}
                addItem={() => dispatch(moveSuggestedToList(i.key))}
              />
            ))}
            <List.Item />
          </List.Accordion>
        </List.Section>

      </ScrollView>
      <FAB.Group
        visible={showFab}
        open={open}
        icon={'pencil'}
        style={styles.fab}
        actions={[{
          icon: 'minus',
          label: 'Delete all checked items',
          onPress: () => {
            dispatch(deleteItems(/*...keys*/))
          },
        }, {
          icon: 'plus',
          label: 'Add items',
          onPress: () => {
            navigation.navigate('ListAddScreen')
          },
        }]}
        onStateChange={onStateChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    margin: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  listTitle: {
    color: '#6200EE',
    fontWeight: "bold",
  },
});

export default ShoppingScreen;