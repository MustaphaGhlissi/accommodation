import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../assets/styles'

const Photo = ({source, onPress}) => {
    return (
        <View 
            style={styles.photoContainer}
        >
            <TouchableOpacity
                style={styles.removePhoto}
                onPress={onPress}
                activeOpacity={0.6}
            >
                <Icon
                    name='delete-outline'
                    size={26}
                    color='#fff'
                />
            </TouchableOpacity>
            <Image 
                style={styles.photo}
                source={{ uri: source }}
                resizeMode="cover"
            />
        </View>
    )
}

export default Photo;
