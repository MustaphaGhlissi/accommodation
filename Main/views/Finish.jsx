import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FAB, RadioButton, TextInput } from 'react-native-paper';
import { styles } from '../assets/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FINISH_FORM } from '../constants/forms';
import { handleTextInput } from '../redux/actions/actionCreators';

class Finish extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        const {
            form,
            handleInput,
            navigation
        } = this.props;

        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps='always'
            >
                
                <View style={styles.content}>
                    <TextInput 
                        multiline
                        numberOfLines={6}
                        label='Remark'
                        mode='outlined'
                    />
                </View>

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => navigation.popToTop()}
                />
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    form: main[FINISH_FORM]
})

const mapDispatchToProps = dispatch => ({
    handleInput: (input, value) => dispatch(handleTextInput(FINISH_FORM, input, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Finish)
