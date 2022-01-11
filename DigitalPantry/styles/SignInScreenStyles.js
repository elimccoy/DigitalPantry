import { StyleSheet } from 'react-native';
import { siteColor } from './SiteConsts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: siteColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: "700",
    fontSize: 35,
    color: 'white',
    marginBottom: 40
  }
});

export default styles;