import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, View, } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FAB, Text, RadioButton, TextInput, withTheme, Portal, Dialog } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { styles } from '../assets/styles';
import { fillForm, handleRadio, handleTextInput, updateTask } from '../redux/actions/actionCreators';
import { TASK_FORM } from '../constants/forms';
import PhotoPicker from '../components/PhotoPicker';
import Photo from '../components/Photo';
import PickerModal from '../components/PickerModal';


class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            photos: [],
            isOpenModal: false
        }
    }

    componentWillUnmount() {
        let { resetForm } = this.props;
        resetForm();
    }

    toggleModal = () => {
        this.setState(state => ({
            isOpenModal: !state.isOpenModal
        }))
    }

    openGallery = () => {

        this.setState({
            isOpenModal: false
        }, () => {
            launchImageLibrary(
                {
                    mediaType: 'photo',
                    includeBase64: true,
                    maxHeight: 500,
                    maxWidth: 750
                },
                (response) => {

                    const { base64, type } = response;

                    if (response.didCancel) {
                        return false;
                    }

                    this.setState(state => ({
                        photos: [
                            ...state.photos,
                            {
                                photo: base64,
                                uri: `data:${type};base64,${base64}`
                            }
                        ]
                    }));
                },
            )
        })
    }

    openCamera = () => {
        this.setState({
            isOpenModal: false,
        }, () => {
            launchCamera(
                {
                    mediaType: 'photo',
                    cameraType: 'back',
                    includeBase64: true,
                    maxHeight: 500,
                    maxWidth: 750
                },
                (response) => {

                    const { base64, type } = response;

                    console.log(response);

                    if (response.didCancel) {
                        return false;
                    }

                    this.setState(state => ({
                        photos: [
                            ...state.photos,
                            {
                                photo: base64,
                                uri: `data:${type};base64,${base64}`
                            }
                        ]
                    }));
                },
            )
        })
    }

    removePhoto = (index) => {
        let { photos } = this.state;

        photos = photos.filter((photo, key) => key !== index);

        this.setState({
            photos
        });
    }

    render() {

        const {
            form,
            navigation,
            handleRadio,
            handleInput,
            route,
            update,
            isUpdating,
            theme
        } = this.props, { task } = route.params;

        const {
            photos,
            isOpenModal,
        } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollable}
                    keyboardShouldPersistTaps='always'
                >

                    <View style={styles.content}>
                        <View style={{
                            marginBottom: 20
                        }}>
                            <Text>
                                Status:
                        </Text>
                            <RadioButton.Group
                                onValueChange={newValue => handleRadio('result', newValue === 'true')}
                                value={form.result?.toString() || task.result.toString()}
                            >
                                <View style={styles.radio}>
                                    <RadioButton value={'true'} />
                                    <Text style={{ flex: 1 }} onPress={() => handleRadio('result', true)}>In Ordnung</Text>
                                </View>
                                <View style={styles.radio}>
                                    <RadioButton value={'false'} />
                                    <Text style={{ flex: 1 }} onPress={() => handleRadio('result', false)}>Nicht in Ordnung</Text>
                                </View>
                            </RadioButton.Group>
                        </View>

                        <TextInput
                            multiline
                            numberOfLines={6}
                            label='Bemerkungen'
                            mode='outlined'
                            onChangeText={text => handleInput('remark', text)}
                            value={form.remark || ''}
                            style={{ marginHorizontal: 5 }}
                        />

                        <View style={styles.photosPickerContainer}>
                            {
                                photos.map((photo, index) => (
                                    <Photo
                                        key={index}
                                        source={photo.uri}
                                        onPress={() => this.removePhoto(index)}
                                    />
                                ))
                            }
                            <PhotoPicker
                                toggleModal={this.toggleModal}
                            />
                        </View>

                    </View>
                </ScrollView>

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => update(navigation, task, photos)}
                />

                <PickerModal
                    toggleModal={this.toggleModal}
                    isOpen={isOpenModal}
                    openCamera={this.openCamera}
                    openGallery={this.openGallery}
                />


                <Portal>
                    <Dialog visible={isUpdating}>
                        <Dialog.Content>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ActivityIndicator color={theme.colors.primary}/>
                                <Text style={styles.labelDownload}>Update in progress...</Text>
                            </View>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </View>
        )
    }
}

const mapStateToProps = ({ main }) => ({
    form: main[TASK_FORM],
    isUpdating: main.isUpdating
})

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(fillForm(TASK_FORM, { result: null, remark: null })),
    handleInput: (input, value) => dispatch(handleTextInput(TASK_FORM, input, value)),
    handleRadio: (radio, value) => dispatch(handleRadio(TASK_FORM, radio, value)),
    update: (navigation, task, photos) => dispatch(updateTask(navigation, task, photos))
})

Task = withTheme(Task);

export default connect(mapStateToProps, mapDispatchToProps)(Task)
