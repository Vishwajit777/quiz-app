import { combineReducers } from "@reduxjs/toolkit";
import IfaReducer from './features/ifa/ifaSlice'
export const rootReducer = combineReducers({

  ifa: IfaReducer,
});
