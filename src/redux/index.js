import { createStore } from 'redux'
import reducer from './reducer'

const initialState = {
    menuName: ''
}

const configStore = () => createStore(reducer,initialState);

export default configStore;