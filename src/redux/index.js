/**
 * create store
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';

const configStore = () => createStore(reducer, composeWithDevTools(applyMiddleware()));

export default configStore;
