import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { siteColor } from '../styles/SiteConsts'
import { FontAwesome } from '@expo/vector-icons'; 

const ScannerButton = () => {

  return(
    <TouchableOpacity style={styles.container}>
      <FontAwesome name="barcode" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '3%',
    right: '5%',
    height:50,
    width:50,
    backgroundColor: siteColor,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ScannerButton;