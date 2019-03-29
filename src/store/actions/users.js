import { GET_ALL_USERS_REQUEST, GET_ALL_USERS_ERROR, GET_ALL_USERS_SUCCESS } from "../types/users";
import Axios from 'axios';

const getAllUsersRequest = () => ({
  type: GET_ALL_USERS_REQUEST
});

const getAllUsersError = (error) => ({
  type: GET_ALL_USERS_ERROR,
  error
});


const getAllUsersSuccess = (users) => ({
  type: GET_ALL_USERS_SUCCESS,
  users
});




export const getAllUsers = () => dispatch =>  {
  dispatch(getAllUsersRequest());

  return Axios.get('/users')
  .then(({ data }) => {
    console.log(data.user);
    return dispatch(getAllUsersSuccess(data.users));
  })
  .catch(error => dispatch(getAllUsersError(error)));
}