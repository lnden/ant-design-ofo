// import { combineReducers } from 'redux'
import { type } from '../action'

const initialState = {
    menuName: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            };
        default:
            return { ...state }
    }
}
