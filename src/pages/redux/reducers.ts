import { combineReducers } from 'redux';
import { SET_SCROLL_POSITION } from './actions';

const initialState = {};

// Reducer for text scroll positions
const textScrollReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_SCROLL_POSITION:
            return {
                ...state,
                [action.payload.textId]: action.payload.scrollPosition,
            };
        default:
            return state;
    }
};

// Combine all reducers
// 定义和导出redux的reducer

const rootReducer = combineReducers({
    textScroll: textScrollReducer,
});

export default rootReducer;