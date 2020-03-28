import { handleActions, createAction } from "redux-actions";
import { all, call, put, take, fork } from "redux-saga/effects";
import { createSelector } from "reselect";

const REDUCER_NAME = "user";

const LOGIN_REQUEST = "USER/LOGIN_REQUEST";
const SET_USER = "USER/SET_USER";
const LOG_OUT = "USER/LOG_OUT";

export const loginRequest = createAction(LOGIN_REQUEST);
export const setUser = createAction(SET_USER);
export const logOut = createAction(LOG_OUT);

const initialState = {
  load: false,
  id: "",
  name: "",
  secondName: "",
  login: "",
  dateOfBirth: "",
  token: ""
};

export default handleActions(
  {
    [loginRequest]: (state, payload) => {
      return { ...state, load: true };
    },
    [setUser]: (state, { payload }) => ({ ...state, load: false, ...payload }),
    [logOut]: () => initialState
  },
  initialState
);

export const userSelector = state => state[REDUCER_NAME];

// export function* getUserInfo() {
//   while (true) {
//     yield take(getUserInfoRequest);
//     const request = axiosClient();
//     try {
//       const response = yield call(() => request.get("/api/users/info"));
//       const { data } = response;
//       // console.log(data)
//       yield put(setUserInfo(data));
//       yield put(setUserWasResponse(true));
//       yield put(userInfoSuccess());
//     } catch (err) {
//       yield put(userInfoSuccess());
//       yield put(setUserWasResponse(true));
//       console.log(err);
//     }
//   }
// }

export function* loginRequestSaga() {
  while (true) {
    const {
      payload: { login, password }
    } = yield take(loginRequest);

    try {
      const response = yield fetch(
        "https://shop-app-brtshk.herokuapp.com/api/authentication/auth",
        {
          method: "POST",
          body: JSON.stringify({ login, password }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const data = yield response.json();
      if (!data.success) throw new Error();
      yield put(setUser({ token: data.token, ...data.data }));
      localStorage.setItem(
        "user",
        JSON.stringify({user : { token: data.token, ...data.data }})
      );
    } catch (e) {
      console.error(e);
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
  yield all([loginRequestSaga(), logOutSaga()]);
}
