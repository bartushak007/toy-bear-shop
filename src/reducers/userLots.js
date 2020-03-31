import { handleActions, createAction } from "redux-actions";
import { all, call, put, take, fork, select } from "redux-saga/effects";
import { createSelector } from "reselect";
import { apiClient } from "../api/client";
import { userSelector } from "./user";
const REDUCER_NAME = "userLots";

const USER_LOTS_REQUEST = "USER_LOTS/USER_LOTS_REQUEST";
const USER_LOTS_SUCCSESS = "USER_LOTS/USER_LOTS_SUCCESS";

const SET_USER_LOTS = "USER_LOTS/SET_USER_LOTS";
const RESET = "USER_LOTS/RESET";

const CREATE_LOT_REQUEST = "USER_LOTS/CREATE_LOT_REQUEST";
const CREATE_LOT_SUCCESS = "USER_LOTS/CREATE_LOT_SUCCESS";

export const userLotsRequest = createAction(USER_LOTS_REQUEST);
export const userLotsSuccess = createAction(USER_LOTS_SUCCSESS);
export const setUserLots = createAction(SET_USER_LOTS);

export const createLotRequest = createAction(CREATE_LOT_REQUEST);
export const createLotSuccess = createAction(CREATE_LOT_SUCCESS);

export const reset = createAction(RESET);

const initialState = {
  load: false,
  userLots: []
};

export default handleActions(
  {
    [userLotsRequest]: state => {
      return { ...state, load: true };
    },
    [userLotsSuccess]: state => {
      return { ...state, load: false };
    },
    [setUserLots]: (state, { payload }) => ({ ...state, userLots: payload }),
    [reset]: () => initialState,
    [createLotRequest]: state => {
      return { ...state, load: true };
    },
    [createLotSuccess]: state => {
      return { ...state, load: false };
    }
  },
  initialState
);

export const userLotsSelector = state => state[REDUCER_NAME];

export function* userLotsRequestSaga() {
  while (true) {
    yield take(userLotsRequest);
    const user = yield select(userSelector);

    try {
      const data = yield apiClient({
        params: { token: user.token },
        url: `https://shop-app-brtshk.herokuapp.com/api/products/userid/${user.id}?token=${user.token}`,
        method: "get"
      });
      console.log(data);
      yield put(setUserLots(data.data));
      yield put(userLotsSuccess());
    } catch (e) {
      console.error("get user lots", e);
      yield put(userLotsSuccess());
    }
  }
}

export function* crateLotRequestSaga() {
  while (true) {
    const { payload } = yield take(createLotRequest);
    const user = yield select(userSelector);
    const userLots = yield select(userLotsSelector);

    try {
      const data = yield apiClient({
        params: { ...payload, user_id: user.id, token: user.token },
        url: `https://shop-app-brtshk.herokuapp.com/api/products`,
        method: "post"
      });
      console.log(data);
      yield put(setUserLots([...userLots, data.data]));
      yield put(createLotSuccess());
    } catch (e) {
      console.error("create lot", e);
      yield put(createLotSuccess());
    }
  }
}

export function* saga() {
  yield all([userLotsRequestSaga(), crateLotRequestSaga()]);
}
