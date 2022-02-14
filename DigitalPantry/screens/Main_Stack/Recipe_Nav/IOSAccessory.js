import { InputAccessoryView, TouchableOpacity, View, StyleSheet, Text } from "react-native"


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

    