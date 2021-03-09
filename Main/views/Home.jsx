import React, { Component } from 'react';
import { Text, View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import { withTheme } from 'react-native-paper';
import { styles } from '../assets/styles';
import ExaminationItem from '../components/ExaminationItem';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [
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
        const {data} = this.state;
        const {theme} = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.flatList}
                    data={data}
                    renderItem={({item, index}) => <ExaminationItem item={item} key={index}/>}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={<RefreshControl onRefresh={() => {}} colors={[theme.colors.primary, theme.colors.accent]} />}
                    refreshing={false}
                />
            </SafeAreaView>
        )
    }
}

Home = withTheme(Home)

export default Home
