import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import createSagaMiddleware from "redux-saga";

import reducers from "../reducers";
import rootSaga from "./rootSaga";


const setLocalStorageCustomMiddleWare = store => next => action => {
  // console.log(action);
  next({...action });
  // localStorage.setItem(
  //   "user",
  //   JSON.stringify(store.getState())
  // );
};

let initialState = {};
try {
  initialState = JSON.parse(localStorage.getItem("user")) || {};
} catch (e) {
  console.error('set initial state error: ', e);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(reducers),
  initialState,
  composeEnhancers(applyMiddleware(sagaMiddleware, setLocalStorageCustomMiddleWare))
);

sagaMiddleware.run(rootSaga);

export default store;
