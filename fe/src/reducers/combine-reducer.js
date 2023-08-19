import { combineReducers } from "redux";
import { userReducer } from "./user-reducer";
import { adminReducer } from "./admin-reducer";

export const combineReducer = combineReducers({ 
    userReducer: userReducer ,
    adminReducer: adminReducer
});