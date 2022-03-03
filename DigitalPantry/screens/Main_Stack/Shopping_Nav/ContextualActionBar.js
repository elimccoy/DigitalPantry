import { Appbar, Button } from 'react-native-paper';
import { deleteSelectedItems, selectAllItems } from '../../../store/slices/shoppingList';
import { useDispatch } from 'react-redux';

/**
 * Appbar that appears when users want to delete multiple items from the shopping list. It prompts users to select items
 * and has two buttons, one for selecting ALL items and the other to delete items once they are selected. Users can also use the
 * X to close this bar and exit the "selection mode". When users press the 'delete' icon it calls the deleteSelectedItems() reducer
 * and when they press the ALL button the selectAllItems() reducer is called
 */

const ContextualActionBar = ({ close }) => {

  const dispatch = useDispatch();
  return (

    <Appbar.Header style={{ width: '100%' }}>
      <Appbar.Action icon='close' onPress={() => { close() }} /> 
      <Appbar.Content title='Select items' />
      <Button icon="checkbox-multiple-marked-circle-outline" mode="contained" compact = {true} dark = {false} color = "white" onPress={() => { dispatch(selectAllItems()) }}>
        All
      </Button>
      <Appbar.Action icon='delete' onPress={() => { dispatch(deleteSelectedItems()); close() }} />
    </Appbar.Header>

  );
}

export default ContextualActionBar;