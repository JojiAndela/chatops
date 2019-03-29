import { createStore, compose, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import combinedReducers from './reducer';

let composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const middleware = [thunk];

export default createStore(combinedReducers, composeEnhancers(
  applyMiddleware(...middleware),
));