// import { combineReducers } from 'redux'
import { type } from '../action'

const ebikeData = (state, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            console.log(state,11111111111111111)
            console.log(action.menuName,22222222222222222222)
            return {
                ...state,
                menuName: action.menuName
            };
        default:
            return { ...state }
    }
}

export default ebikeData;