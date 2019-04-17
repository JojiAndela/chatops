import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_ERROR, GET_ALL_USERS_SUCCESS, AUTH_USER_REQUEST, AUTH_USER_ERROR, AUTH_USER_SUCCESS, LOGOUT_USER } from "../types/users";
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { getAllChats } from "./chat";
import { getAllUsers } from "./users";

const authUserRequest = () => ({
  type: AUTH_USER_REQUEST
});

const authUserError = (error) => ({
  type: AUTH_USER_ERROR,
  error
});


export const authUserSuccess = (user) => ({
  type: AUTH_USER_SUCCESS,
  user
});


const logoutUserSuccess = () => ({
  type: LOGOUT_USER
});

export const signUpUser = (details) => dispatch =>  {
  dispatch(authUserRequest());

  return Axios.post('/auth/signup', {
    ...details
  })
  .then(async({ data }) => {
    Axios.defaults.headers.common.Authorization = data.token;
    await dispatch(getAllChats());
    await dispatch(getAllUsers());
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    await AsyncStorage.setItem('token', data.token);
    dispatch(authUserSuccess({...data.user, token: data.token}));
    return  nav.navigate('Main');
  })
  .catch(error => {
    console.log('signup', error);
    dispatch(authUserError(error))});
}

export const loginUser = (details, nav) => dispatch =>  {
  dispatch(authUserRequest());
  return Axios.post('/auth/login', {
    ...details
  })
  .then(async({ data }) => {
    Axios.defaults.headers.common.Authorization = data.token;
    await dispatch(getAllChats());
    await dispatch(getAllUsers());
    await AsyncStorage.setItem('user', JSON.stringify(data.user));
    await AsyncStorage.setItem('token', data.token);
    dispatch(authUserSuccess({...data.user, token: data.token}));
    return  nav.navigate('Main');
  })
  .catch(error => {
    console.log('login', error);
    dispatch(authUserError(error))});
}

export const logoutUser = (nav) => async dispatch =>  {
  try {

    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    dispatch(logoutUserSuccess());
    return  nav.navigate('Login');
  } catch (error) {

  }
}