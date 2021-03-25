import { combineReducers } from "redux";

import counter from '../features/counter/counterSlice'

const rootReducer = combineReducers({
    counter
})

export default rootReducer