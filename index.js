/**
 * @format
 */

import {AppRegistry} from 'react-native';
import axios from'axios';
import App from './App';
import {name as appName} from './app.json';
import { getAllUsers } from './src/store/actions/users';
const __API__ = 'http://localhost:3000/api'; //process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;
import store from './src/store';

axios.defaults.baseURL = __API__;
store.dispatch(getAllUsers());
AppRegistry.registerComponent(appName, () => App);
