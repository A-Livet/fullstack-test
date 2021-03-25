import { applyMiddleware, createStore } from 'redux'

import thunk from "redux-thunk"

const initialState = {
    objectives: [],
    weightMissing: false,
    invalidWeight: false
}

function rootReducer(state, action) {
    switch(action.type){
        case "GET_OBJECTIVES":
            return { objectives: action.json }
        case "CHECK_WEIGHT":
            return { objectives: state.objectives, weightMissing: action.json.weight_missing, invalidWeight: action.json.weight_wrong}
        default:
            return state
    }
}

export default function configureStore() {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk));
    return store;
}
