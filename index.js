/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './Main/App';
import {name as appName} from './app.json';
import { theme } from './Main/assets/themes';

const Main = () => (
    <PaperProvider theme={theme}>
        <App />
    </PaperProvider>
)

AppRegistry.registerComponent(appName, () => Main);
