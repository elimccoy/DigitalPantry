import { Appbar } from 'react-native-paper';


const CustomNavigationBar = ({ navigation, back }) => { 

  return (
    <Appbar.Header>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Shopping Screen"/>
    </Appbar.Header>
  );
}

export default CustomNavigationBar;