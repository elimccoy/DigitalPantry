import react, {useState, useEffect} from 'react';
import {Image, View, Platform, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import  *  as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

export default function UploadImage()
{
    const [image, setImage] = useState(null);
    const addImage= async () =>{
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        });

        if (!_image.cancelled) {
            setImage(_image.uri);
        }
    };

    return (
        <View style={Styles.container}>
            {
                image && <Image source = {{uri: image}} style = {{width: '100%', height: 200}} />
            }

            <View style = {Styles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={Styles.uploadBtn} >
                    <Text>
                        {image ? 'Edit' : 'Upload'} Image
                    </Text>
                    <AntDesign name = 'camera' size = {20} color = 'black' />
                </TouchableOpacity>
            </View>
        </View>
    );

}

const Styles=StyleSheet.create({
    container:{
        marginTop: StatusBar.height,
        elevation: 2,
        height:200,
        width:'100%',
        backgroundColor: 'grey',
        position: 'relative',
        overflow:'hidden'
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
});