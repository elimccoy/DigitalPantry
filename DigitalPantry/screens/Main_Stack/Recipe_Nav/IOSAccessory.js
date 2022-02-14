import { InputAccessoryView, TouchableOpacity, View } from "react-native"


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

    