import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List, FAB, Subheading } from 'react-native-paper';
import ShoppingListItem from '../../../components/ShoppingListItem.js';
import SuggestedItem from '../../../components/SuggestedItem.js';
import { deleteItems, moveSuggestedToList, addSuggestedItem, setSuggestedItems } from '../../../store/slices/shoppingList';
import { useNavigation } from '@react-navigation/native';
import Header from '../../../components/Header';
import ContextualActionBar from './ContextualActionBar';
import moment from 'moment';


const ShoppingScreen = ({ route, navigation }) => {

  const listItems = useSelector((state) => state.shoppingList.list);
  const suggItems = useSelector((state) => state.shoppingList.suggested);
  const dispatch = useDispatch();

  const [showFab] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const [cabIsOpen, setCabIsOpen] = useState(false);
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const handlePress = () => setExpanded(!expanded);

  useEffect(() => {
    if (cabIsOpen === true) {
      //render cab
      //console.log("open cab effect: " + cabIsOpen);
      navigation.setOptions({
        header: (props) => (<ContextualActionBar {...props} />)
      });
    } else {
      navigation.setOptions({ header: (props) => <Header {...props} /> });
    }
  }, [cabIsOpen]);


  const openHeader = () => {
    setCabIsOpen(true);
  }

  const closeHeader = () => {
    setCabIsOpen(false);
    //unselect items if any selected
  }

  const deleteSelected = () => {
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onLongPress={() => { navigation.navigate('ListEditDeleteScreen', { itemToEdit: item }) }}
        onPress={() => { handlePress() }}
        key={item.key}
      >
        <ShoppingListItem item={item} key={item.key} />
      </TouchableOpacity>
    );
  };

  const renderSuggestedItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={item.key}
      >
        <SuggestedItem item={item} key={item.key} addItem={() => dispatch(moveSuggestedToList(item.key))} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={listItems}
          //style={styles.scollContainer}
          numColumns={2}
          renderItem={renderItem}
          scrollEnabled={true}
        />
        <Subheading>Suggested:</Subheading>
        <FlatList
          data={suggItems}
          //style={styles.scollContainer}
          numColumns={2}
          renderItem={renderSuggestedItem}
          scrollEnabled={false}
        />

      </ScrollView>

      <FAB.Group
        visible={showFab}
        open={open}
        icon={'pencil'}
        style={styles.fab}
        actions={[{
          icon: 'checkbox-marked-circle',
          label: 'Select items',
          onPress: () => {
            openHeader()
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


});

export default ShoppingScreen;