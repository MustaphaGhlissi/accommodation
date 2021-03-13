import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FAB, RadioButton, TextInput } from 'react-native-paper';
import { styles } from '../assets/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FINISH_FORM } from '../constants/forms';
import { fillForm, handleTextInput, updateExamination } from '../redux/actions/actionCreators';

class Finish extends Component {
    
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentWillUnmount() {
        let {resetForm} = this.props;

        resetForm();
    }
    
    

    render() {

        const {
            form,
            handleInput,
            navigation,
            update,
            route
        } = this.props, {examinationId} = route.params;

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
                        onChangeText={text => handleInput('remark', text)}
                        value={form.remark || ''}
                    />
                </View>

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => update(navigation, examinationId)}
                />
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    form: main[FINISH_FORM]
})

const mapDispatchToProps = dispatch => ({
    resetForm: () => dispatch(fillForm(FINISH_FORM, {remark: null})),
    handleInput: (input, value) => dispatch(handleTextInput(FINISH_FORM, input, value)),
    update: (navigation, examinationId) => dispatch(updateExamination(navigation, examinationId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Finish)
