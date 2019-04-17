/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import initApp from './initApp';
import store from './src/store';

initApp(store);



AppRegistry.registerComponent(appName, () => App);
