import React, { Component } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { FAB, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../assets/styles';
import TaskItem from '../components/TaskItem';
import { FINISH_FORM } from '../constants/forms';
import { fetchTasks, fillForm } from '../redux/actions/actionCreators';

class Tasks extends Component {

    constructor(props) {
        super(props);

        this.state = {
           
        }
    }


    componentDidMount() {
        const {
            readFromStorage,
            route
        } = this.props, {examinationId} = route.params;

        readFromStorage(examinationId);
    }
    

    render() {

        const {
            navigation, data,
            route, fillForm
        } = this.props, {examinationId, remark, title} = route.params;

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={data}
                    renderItem={({item, index}) => <TaskItem examinationId={examinationId} item={item} key={index}/>}
                    keyExtractor={item => item.id.toString()} 
                />

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => {
                        fillForm(remark);
                        navigation.navigate('Finish', {examinationId, title});
                    }}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({main}) => ({
    isLoading: main.isLoading,
    isRefreshing: main.isRefreshing,
    data: main.examinationTasks,
})

const mapDispatchToProps = dispatch => ({
    fillForm: (remark) => dispatch(fillForm(FINISH_FORM, {remark})),
    readFromStorage: (examinationId, bool = false) => dispatch(fetchTasks(examinationId, bool))
})

Tasks = withTheme(Tasks)

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)