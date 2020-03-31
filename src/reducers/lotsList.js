import { handleActions, createAction } from "redux-actions";
import { all, call, put, take, fork, select } from "redux-saga/effects";
import { createSelector } from "reselect";
import { apiClient } from "../api/client";
import { userSelector } from "./user";
const REDUCER_NAME = "lots";

const LOTS_REQUEST = "LOTS/LOTS_REQUEST";
const LOTS_SUCCSESS = "LOTS/LOTS_SUCCESS";

const SET_LOTS = "LOTS/SET_LOTS";
const RESET = "LOTS/RESET";

export const lotsRequest = createAction(LOTS_REQUEST);
export const lotsSuccess = createAction(LOTS_SUCCSESS);
export const setlots = createAction(SET_LOTS);
export const reset = createAction(RESET);

const initialState = {
  load: false,
  lots: []
};

export default handleActions(
  {
    [lotsRequest]: state => {
      return { ...state, load: true };
    },
    [lotsSuccess]: state => {
      return { ...state, load: false };
    },
    [setlots]: (state, { payload }) => ({ ...state, lots: payload }),
    [reset]: () => initialState
  },
  initialState
);

export const lotsSelector = state => state[REDUCER_NAME];

export function* lotsRequestSaga() {
  while (true) {
    yield take(lotsRequest);

    try {
      const data = yield apiClient({
        url: `https://shop-app-brtshk.herokuapp.com/api/products`
      });
      console.log(data);
      yield put(setlots(data.data));
      yield put(lotsSuccess());
    } catch (e) {
      console.error("get products", e);
      yield put(lotsSuccess());
    }
  }
}

export function* saga() {
  yield all([lotsRequestSaga()]);
}
