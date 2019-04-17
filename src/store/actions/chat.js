import Axios from 'axios';
import { GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_ERROR, GET_ALL_CHATS_SUCCESS, JOIN_CHAT_SUCCESS, JOIN_CHAT_REQUEST, JOIN_CHAT_ERROR, GET_CHAT_REQUEST, GET_CHAT_ERROR, GET_CHAT_SUCCESS } from '../types/chats';

const getAllChatsRequest = () => ({
  type: GET_ALL_CHATS_REQUEST
});

const getAllChatsError = (error) => ({
  type: GET_ALL_CHATS_ERROR,
  error
});


const getAllChatsSuccess = (chats) => ({
  type: GET_ALL_CHATS_SUCCESS,
  chats
});

const getChatRequest = () => ({
  type: GET_CHAT_REQUEST
});

const getChatError = (error) => ({
  type: GET_CHAT_ERROR,
  error
});


const getChatSuccess = (chat) => ({
  type: GET_CHAT_SUCCESS,
  chat
});

const joinChatRequest = () => ({
  type: JOIN_CHAT_REQUEST
});

const joinChatError = (error) => ({
  type: JOIN_CHAT_ERROR,
  error
});


const joinChatSuccess = () => ({
  type: JOIN_CHAT_SUCCESS
});


export const getAllChats = () => dispatch =>  {
  dispatch(getAllChatsRequest());

  return Axios.get('/chats')
  .then(({ data }) => {
    return dispatch(getAllChatsSuccess(data.chats));
  })
  .catch(error => dispatch(getAllChatsError(error)));
}

export const joinChat = (chatWith, nav, name) => dispatch =>  {
  dispatch(joinChatRequest());
  // alert('started')
  return Axios.post('/chats', {
    chatWith
  })
  .then(({ data }) => {
    // alert('did it');
    dispatch(getChat(data.chat.id));
    nav.navigate('Message', { name, chat: data.chat });
    dispatch(joinChatSuccess());
    dispatch(getAllChats());
  })
  .catch(error => dispatch(joinChatError(error)));
}

export const getChat = (id) => dispatch =>  {
  dispatch(getChatRequest());

  return Axios.get(`/chats/${id}`)
  .then(({ data }) => {
    console.log(data.chat);
    dispatch(getChatSuccess(data.chat));
  })
  .catch(error => dispatch(getChatError(error)));
}

export const sendMessage = (id, msg) => dispatch =>  {
  // dispatch(getChatRequest());

  return Axios.post(`/chats/${id}/messages`, {
    msg
  })
  .then(({ data }) => {
    // console.log(data.chat);
    // dispatch(getChatSuccess(data.chat));
    dispatch(getChat(id));
  })
  .catch(error => dispatch(getChatError(error)));
}