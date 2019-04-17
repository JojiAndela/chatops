import { GET_ALL_CHATS_REQUEST, GET_ALL_CHATS_ERROR, GET_ALL_CHATS_SUCCESS, GET_CHAT_ERROR, GET_CHAT_REQUEST, GET_CHAT_SUCCESS } from "../types/chats";

const INITIAL_STATE = {
  chats: [],
  loading: false,
  error: null,
  chat: {}
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case GET_ALL_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
      
    case GET_ALL_CHATS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case GET_ALL_CHATS_SUCCESS:
      return {
        ...state,
        chats: action.chats,
        loading: false
      }
    case GET_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
      
    case GET_CHAT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case GET_CHAT_SUCCESS:
      return {
        ...state,
        chat: action.chat,
        loading: false
      }

    default:
      return state
  }
};

