import React from 'react';
import { View, TouchableOpacity, } from 'react-native';
import Modal from 'react-native-modal';
import { Divider, IconButton, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PickerModal = ({toggleModal, isOpen, openCamera, openGallery}) => {
    return (
        <Modal
            isVisible={isOpen}
            hasBackdrop={false}
            style={{ margin: 0, backgroundColor: 'rgba(0,0,0,0.7)' }}
            onBackButtonPress={toggleModal}
            onBackdropPress={toggleModal}
            animationOut='fadeOut'
            animationIn='fadeIn'
        >
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>

                <IconButton
                    icon='close'
                    color='#fff'
                    style={{
                        position: 'absolute',
                        right: 5,
                        top: 5
                    }}
                    onPress={toggleModal}
                />

                <TouchableOpacity
                    style={{
                        padding: 20,
                        alignItems: 'center',
                        backgroundColor: '#F1F1F1',
                        flexDirection: 'row',
                    }}
                    onPress={openCamera}
                    activeOpacity={0.6}
                >
                    <Icon 
                        name='camera'
                        size={32}
                        color='#C2C2C2'
                    />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 15
                    }}>
                        Use Camera
                    </Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                    style={{
                        padding: 20,
                        alignItems: 'center',
                        backgroundColor: '#F1F1F1',
                        flexDirection: 'row',
                    }}
                    onPress={openGallery}
                    activeOpacity={0.6}
                >
                    <Icon 
                        name='image'
                        size={32}
                        color='#C2C2C2'
                    />
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 15
                    }}>
                        Open gallery
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default PickerModal
