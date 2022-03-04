/**
 * Name: BarcodeScannerScreen.js
 * Desc: React native screen scan barcodes and recive data using expos barcode scanner.
 * File type: Screen
*/

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const BarcodeScannerScreen = ({navigation}) => {

  //States:
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  //Use effect on data change to check for permissions to the camera.
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /**
   * Name: handleBarCodeScanned.
   * Desc: Takes a scanned barcodes data and sends it to the add screen.
   * @param {type, data}
   */
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.navigate("AddScreen", {upc: data});
  };

  //Display to user the need for access to camera.
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default BarcodeScannerScreen;