import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_ERROR, GET_ALL_USERS_SUCCESS, AUTH_USER_REQUEST, AUTH_USER_ERROR, AUTH_USER_SUCCESS } from "../types/users";
import Axios from 'axios';

const authUserRequest = () => ({
  type: AUTH_USER_REQUEST
});

const authUserError = (error) => ({
  type: AUTH_USER_ERROR,
  error
});


const authUserSuccess = (user) => ({
  type: AUTH_USER_SUCCESS,
  user
});




export const signUpUser = (details) => dispatch =>  {
  dispatch(authUserRequest());

  return Axios.post('/auth/signup', {
    ...details
  })
  .then(({ data }) => {
    console.log('signup',data.user);
    return dispatch(authUserSuccess({...data.user, token: data.token}));
  })
  .catch(error => dispatch(authUserError(error)));
}

export const loginUser = (details, nav) => dispatch =>  {
  dispatch(authUserRequest());
  return Axios.post('/auth/login', {
    ...details
  })
  .then(({ data }) => {
    dispatch(authUserSuccess({...data.user, token: data.token}));
    return  nav.navigate('Main');
  })
  .catch(error => {
    console.log('login', error);
    dispatch(authUserError(error))});
}