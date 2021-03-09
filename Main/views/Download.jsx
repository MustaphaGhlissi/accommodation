import React, { Component } from 'react';
import { Text, View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { FAB, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { styles } from '../assets/styles';
import DownloadItem from '../components/DownloadItem';
import { onCheckFlatExamination } from '../redux/actions/actionCreators';

class Download extends Component {

    constructor(props) {
        super(props);

        this.state = {
            downloads: [
                {
                  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                  name: 'Flat examination 78',
                },
                {
                  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                  name: 'Flat examination 778',
                },
                {
                  id: '58694a0f-3da1-471f-bd96-145571e29d72',
                  name: 'Flat examination 728',
                },
            ]
        }
    }

    render() {
        const {downloads} = this.state;
        const {theme, checkItem, checkedItems} = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={downloads}
                    renderItem={({item, index}) => <DownloadItem 
                        item={item} key={index} 
                        onCheck={() => checkItem(item)} checked={checkedItems.find(checkedItem => item.id === checkItem.id )}   
                        
                        />
                    }
                    keyExtractor={item => item.id.toString()}
                    refreshControl={<RefreshControl onRefresh={() => {}} colors={[theme.colors.primary, theme.colors.accent]} />}
                    refreshing={false}
                />

                <FAB
                    style={styles.fab}
                    color='#fff'
                    icon="check"
                    onPress={() => console.log('Pressed')}
                />
            </SafeAreaView>
        )
    }
}


const mapStateToProps = ({main}) => ({
    checkedItems: main.checkedFlatExaminations
})

const mapDispatchToProps = dispatch => ({
    checkItem: (item) => dispatch(onCheckFlatExamination(item)),
})

Download = withTheme(Download)

export default connect(mapStateToProps, mapDispatchToProps)(Download)
