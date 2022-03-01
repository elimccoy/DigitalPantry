import { StyleSheet, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FAB, Subheading } from 'react-native-paper';
import ShoppingListItem from '../../../components/ShoppingListItem.js';
import SuggestedItem from '../../../components/SuggestedItem.js';
import { moveSuggestedToList, editItem, unselectAllItems } from '../../../store/slices/shoppingList';
import CustomNavigationBar from './CustomNavigationBar.js';
import ContextualActionBar from './ContextualActionBar';
import moment from 'moment';

const ShoppingScreen = ({ navigation }) => {

  const listItems = useSelector((state) => state.shoppingList.list);
  const pantryItems = useSelector((state) => state.pantry.ingredients);
  const suggItems = pantryItems.filter((ingredient) => ((ingredient.remaining === 'Low') || (moment(ingredient.expirationDate).diff(Date.now(), 'days') < 7))
    && !(listItems.find((item) => item.key === ingredient.key))).map((suggestedItem) =>
    ({
      key: suggestedItem.key,
      name: suggestedItem.name,
      unit: suggestedItem.unit,
      image: suggestedItem.image,
      brand: suggestedItem.brand,
      description: suggestedItem.description,
      remaining: suggestedItem.remaining,
      amount: suggestedItem.amount,
      expirationDate: suggestedItem.expirationDate,
    }));
  const dispatch = useDispatch();

  const [showFab] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [cabIsOpen, setCabIsOpen] = useState(false);
  const [state, setState] = useState({ open: false });
  const [selectedItems, setSelected] = useState([]);
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    if (cabIsOpen === true) {
      navigation.setOptions({
        header: (props) => (<ContextualActionBar {...props} close={closeHeader} />),
      });
    } else {
      navigation.setOptions({ header: (props) => <CustomNavigationBar {...props} /> });
    }
  }, [cabIsOpen]);


  const openHeader = () => {
    setCabIsOpen(true);
  }

  const closeHeader = () => {
    setCabIsOpen(false);
    dispatch(unselectAllItems());
  }

  const addAllSuggested = () => {
    suggItems.map((item) => dispatch(moveSuggestedToList(item)));
  }

  const handleSelect = (item) => {
    if (cabIsOpen === true && listItems.find((listItem) => listItem.key === item.key)) { // if user is selecting
      //edit item in list
      let newItem = {
        key: item.key,
        name: item.name,
        unit: item.unit,
        amount: item.amount,
        image: item.image,
        brand: item.brand,
        description: item.description,
        remaining: item.remaining,
        expirationDate: item.expirationDate,
        checked: !(item.checked),
      };

      dispatch(editItem(newItem));

    } else {//otherwise go to info screen
      navigation.navigate("ListItemInfoScreen", { key: item.key });
    }

  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onLongPress={() => { if (cabIsOpen === false) { navigation.navigate('ListEditDeleteScreen', { itemToEdit: item }) } }}
        onPress={() => { handleSelect(item) }}
        key={item.key}
      >
        <ShoppingListItem item={item} key={item.key} />
      </TouchableOpacity>
    );
  };

  const renderSuggestedItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={item.key}
      >
        <SuggestedItem item={item} key={item.key} addItem={() => dispatch(moveSuggestedToList(item))} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={listItems}
        numColumns={2}
        renderItem={renderItem}
        scrollEnabled={true}
        ListFooterComponent={
          <View>

            <View style={styles.subheading}>
              <Subheading style={styles.listTitle}>Suggested:</Subheading>
            </View>
            <FlatList
              data={suggItems}
              numColumns={2}
              renderItem={renderSuggestedItem}
              scrollEnabled={false}
            />
          </View>
        }
      />

      <FAB.Group
        visible={showFab}
        open={open}
        icon={'pencil'}
        style={styles.fab}
        actions={[
          {
            icon: 'plus-circle-outline',
            label: 'Add an item',
            onPress: () => {
              navigation.navigate('ListAddScreen')
            },
          },
          {
            icon: 'plus-circle-multiple-outline',
            label: 'Add all suggested items',
            onPress: () => {
              addAllSuggested();
            },
          },
          {
            icon: 'minus-circle-outline',
            label: 'Delete Shopping items',
            onPress: () => {
              openHeader()
            },
          }

        ]}
        onStateChange={onStateChange}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 3,
    shadowColor: '#52006A',
  },
  scollContainer: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: Dimensions.get('window').width / 2, // approximate a square
    width: Dimensions.get('window').width / 2 - 10,
  },
  backgroundImgStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  backgroundImgStyleImageStyles: {
    borderRadius: 3,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 7,
    left: 7,
    maxWidth: "70%",
  },
  nameBadge: {
    position: 'absolute',
    top: 7,
    right: 7,
    maxWidth: "70%",
  },
  check: {
    position: 'absolute',
    top: 7,
    left: 7,
    maxWidth: "20%",
    color: "purple",
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
  subheading: {
    flex: 1,
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

});

export default ShoppingScreen;