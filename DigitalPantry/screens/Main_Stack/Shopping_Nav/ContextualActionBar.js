import { Appbar, Button } from 'react-native-paper';
import { deleteSelectedItems, selectAllItems } from '../../../store/slices/shoppingList';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';

const ContextualActionBar = ({ close }) => {

  const dispatch = useDispatch();
  return (

    <Appbar.Header style={{ width: '100%' }}>
      <Appbar.Action icon='close' onPress={() => { close() }} />
      <Appbar.Content title='Select items' />
      <Button icon="checkbox-multiple-marked-circle-outline" constentStyle = {styles.buttonContent} mode="contained" compact = {true} dark = {false} color = "white" onPress={() => { dispatch(selectAllItems()) }}>
        All
      </Button>
      <Appbar.Action icon='delete' onPress={() => { dispatch(deleteSelectedItems()); close() }} />
    </Appbar.Header>

  );
}


const styles = StyleSheet.create({
  buttonContent: {
    borderWidth:1,
    borderColor: 'white',

  },
});
export default ContextualActionBar;