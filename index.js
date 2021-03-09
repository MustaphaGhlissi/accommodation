/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './Main/redux/store';
import App from './Main/App';
import {name as appName} from './app.json';
import { theme } from './Main/assets/themes';

const Main = () => (
    <StoreProvider store={store}>
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    </StoreProvider>
    
)

AppRegistry.registerComponent(appName, () => Main);
