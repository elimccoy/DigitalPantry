/**
 * Name: Header.js
 * Desc: React component to render the app bar with a back button if it exists on the route.
 * File type: Component
*/

import { Appbar } from 'react-native-paper';

const Header = ({ route, navigation, back }) => {
  return (
    <Appbar.Header>
      { back && <Appbar.BackAction onPress={navigation.goBack} />}
      <Appbar.Content title={route.name} />
    </Appbar.Header>
  );
}

export default Header;
