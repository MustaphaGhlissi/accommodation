import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../assets/styles'

const PhotoPicker = ({toggleModal}) => {
    return (
        <TouchableOpacity 
            style={styles.photoContainer}
            onPress={toggleModal}
            activeOpacity={0.6}
        >
            <View  style={styles.photoPicker}>
                <Icon name='file-upload' color="#D1D1D1" size={48}/>
            </View>
        </TouchableOpacity>
    )
}

export default PhotoPicker
