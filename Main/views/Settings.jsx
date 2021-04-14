import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FAB, TextInput } from 'react-native-paper'
import { connect } from 'react-redux';
import { styles } from '../assets/styles'
import { SETTINGS_FORM } from '../constants/forms';
import { handleTextInput, saveIpAddress } from '../redux/actions/actionCreators';
import TextInputMask from "react-native-text-input-mask";

class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            navigation, 
            saveIp,
            form,
            handleInput
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <TextInput 
                        label='API ip-address'
                        mode='outlined'
                        placeholder='127.0.0.1'
                        value={form.ipAddress || ''}
                        render={props =>
                            <TextInputMask
                              {...props}
                              onChangeText={(formatted, extracted) => {
                                handleInput('ipAddress', extracted)
                              }}
                              mask="[099]{.}[099]{.}[099]{.}[099]"
                            />
                        }
                    />
                </View>
                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    disabled={!form.ipAddress || form.ipAddress.trim() === ''}
                    onPress={() => saveIp(navigation)}
                />
            </View>
        )
    }
}


const mapStateToProps = ({main}) => ({
    form: main[SETTINGS_FORM]
})

const mapDispatchToProps = dispatch => ({
    saveIp: (navigation) => dispatch(saveIpAddress(navigation)),
    handleInput: (input, value) => dispatch(handleTextInput(SETTINGS_FORM, input, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)