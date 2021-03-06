import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './authReducer';
import memesReducer from './memesReducer';
import singleMemeReducer from './singleMemeReducer';
import OrderItemsReducer from './orderReducer';
import userReducer from './userReducer';
import singleUserReducer from './singleUserReducer';
import localStorageReducer from './localStorageReducer';

const reducer = combineReducers({
  auth: authReducer,
  memes: memesReducer,
  singleMeme: singleMemeReducer,
  OrderItems: OrderItemsReducer,
  user: userReducer,
  singleUser: singleUserReducer,
  localStorage: localStorageReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './authReducer';
