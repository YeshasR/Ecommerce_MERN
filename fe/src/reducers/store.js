import { legacy_createStore as createStore} from 'redux'
import { combineReducer } from "./combine-reducer";

export const store = createStore(
    combineReducer
)