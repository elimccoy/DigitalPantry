import { Appbar } from 'react-native-paper';

/**
 * Navigation Bar for the Shopping Screen. Lets users know when they are in the Shopping Screen or gives them the option to go back
 * to the Shopping Screen if they are in one of the other screens in ListStackNav.
 */

const CustomNavigationBar = ({ navigation, back }) => {
  return (
    <Appbar.Header>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="Shopping List"/>
    </Appbar.Header>
  );
}

export default CustomNavigationBar;