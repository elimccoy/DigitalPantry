import react, {useState, useEffect} from 'react';
import {Image, View, Platform, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import  *  as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const addImage= async () =>{
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{uri: image}} style={styles.image} />}

      <View style = {styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
          <Text>
            {image ? 'Edit' : 'Upload'} Image
          </Text>
          <AntDesign name='camera' size={20} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop: StatusBar.currentHeight,
    elevation: 2,
    height:200,
    width:'100%',
    backgroundColor: 'lightgrey',
    overflow:'hidden',
    alignItems:'center'
  },
  uploadBtnContainer:{
    opacity:0.5,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'white',
    width:'100%',
    height:'25%',
    flex:1,
  },
  uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
});