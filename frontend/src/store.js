import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({});

const initialState = {};

const middleware = [thunk];

const store = configureStore(
  {reducer: reducer},
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
