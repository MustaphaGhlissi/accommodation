/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './config/stack';
import { StatusBar } from 'react-native';
import { withTheme } from 'react-native-paper';
import { boot } from './redux/actions/actionCreators';
import SplashScreen from './views/SplashScreen';
import { connect } from 'react-redux';

export class App extends Component {

  componentDidMount() {
    let {boot} = this.props;
    boot();
  }
  

  render() {

    let {theme, isBooting} = this.props;

    if(isBooting) {
      return (
        <SplashScreen color={theme.colors.primary} />
      )
    }

    return (
      <NavigationContainer>
        <StatusBar backgroundColor={theme.colors.primary}/>
        <HomeStack />
      </NavigationContainer>
    )
  }
}

const mapStateToProps = ({main}) => ({
  isBooting: main.isBooting,
})

const mapDispatchToProps = dispatch => ({
  boot: () => dispatch(boot())
})

App = withTheme(App)

export default connect(mapStateToProps, mapDispatchToProps)(App)
