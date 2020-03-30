import { handleActions, createAction } from "redux-actions";
import { all, call, put, take, fork } from "redux-saga/effects";
import { createSelector } from "reselect";
import { apiClient } from "../api/client";
const REDUCER_NAME = "user";

const LOGIN_REQUEST = "USER/LOGIN_REQUEST";
const LOGIN_SUCCSESS = "USER/LOGIN_SUCCESS";
const REGISTER_REQUEST = "USER/REGISTER_REQUEST";
const REGISTER_SUCCESS = "USER/REGISTER_SUCCESS";
const SET_USER = "USER/SET_USER";
const LOG_OUT = "USER/LOG_OUT";

export const registerRequest = createAction(REGISTER_REQUEST);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCSESS);
export const setUser = createAction(SET_USER);
export const logOut = createAction(LOG_OUT);

const initialState = {
  load: false,
  loadRegister: false,
  id: "",
  name: "",
  secondName: "",
  login: "",
  dateOfBirth: "",
  token: ""
};

export default handleActions(
  {
    [loginRequest]: state => {
      return { ...state, load: true };
    },
    [loginSuccess]: state => {
      return { ...state, load: false };
    },
    [setUser]: (state, { payload }) => ({ ...state, ...payload }),
    [logOut]: () => initialState,
    [registerRequest]: state => ({
      ...state,
      loadRegister: true
    }),
    [registerSuccess]: state => ({
      ...state,
      loadRegister: false
    })
  },
  initialState
);

export const userSelector = state => state[REDUCER_NAME];
export const loadRegisterSelector = state => state[REDUCER_NAME].loadRegister;

export function* loginRequestSaga() {
  while (true) {
    const {
      payload: { login, password }
    } = yield take(loginRequest);

    try {
      const data = yield apiClient({
        params: { login, password },
        url: "https://shop-app-brtshk.herokuapp.com/api/authentication/auth",
        method: "post"
      });
      yield put(setUser({ token: data.token, ...data.data }));
      yield put(loginSuccess());
      localStorage.setItem(
        "user",
        JSON.stringify({ user: { token: data.token, ...data.data } })
      );
    } catch (e) {
      console.error("authentication/auth", e);
      yield put(loginSuccess());
    }
  }
}

export function* registerRequestSaga() {
  while (true) {
    const { payload } = yield take(registerRequest);

    try {
      const data = yield apiClient({
        params: { ...payload },
        url:
          "https://shop-app-brtshk.herokuapp.com/api/authentication/register",
        method: "post"
      });

      yield put(registerSuccess());
      console.log(data);
    } catch (e) {
      console.error("authentication/register", e);
      yield put(registerSuccess());
    }
  }
}

export function* logOutSaga() {
  while (true) {
    yield take(logOut);
    localStorage.removeItem("user");
  }
}

export function* saga() {
  yield all([loginRequestSaga(), logOutSaga(), registerRequestSaga()]);
}
