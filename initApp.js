import AsyncStorage from '@react-native-community/async-storage';
import { getAllUsers } from './src/store/actions/users';
import { authUserSuccess } from './src/store/actions/auth';
import { getAllChats } from './src/store/actions/chat';
import axios from'axios';

const __API__ = 'http://localhost:3000/api'; //process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_DEV;


export default async (store) => {

  axios.defaults.baseURL = __API__;
  const token = await AsyncStorage.getItem('token');
  const JSONuser = await AsyncStorage.getItem('user');
  if(JSONuser && token){
    axios.defaults.headers.common.Authorization = token;
    const user = JSON.parse(JSONuser);
    const payload = { ...user, token };
    store.dispatch(authUserSuccess(payload));  
    store.dispatch(getAllChats());  
    return store.dispatch(getAllUsers());
  }
};