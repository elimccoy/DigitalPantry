
/*
Name: IOSAccessory.js
Desc: A react native component for use exclusively in iOS devices. Adds a done button to the top of keyboards so they can be dismissed.
File Type: Component
*/


import { InputAccessoryView, TouchableOpacity, View, StyleSheet, Text } from "react-native"

// Simple done button above iOS keyboard following iOS standard styling.
// Dismisses open keyboard on press.
// It's id is "Done", input box must specify ID to use.
// Cannot be used with Andriod devices. 
export default function IOSAccessory() {

  return (
    <InputAccessoryView nativeID="Done">
      <View style={styles.accessory}>
        <TouchableOpacity
          onPress={() => Keyboard.dismiss()}
        >
          <Text style={styles.doneButton}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </InputAccessoryView>
  );

}

const styles = StyleSheet.create({
  accessory: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 8,
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 17,
  },

});

