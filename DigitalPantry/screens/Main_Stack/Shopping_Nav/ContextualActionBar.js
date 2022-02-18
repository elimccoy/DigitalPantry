import { Appbar } from 'react-native-paper';

const ContextualActionBar = ({ navigation, back }) => {
  return (


    <Appbar.Header style={{width: '100%'}}>
        <Appbar.Action icon='close' onPress={() => {}} />
        <Appbar.Content title='Select items to delete' />
        <Appbar.Action icon='delete' onPress={() => {}} />
      
    </Appbar.Header>
    
  );
}

export default ContextualActionBar;