import { handleActions, createAction } from "redux-actions";
import { all, call, put, take, select } from "redux-saga/effects";
import { apiClient } from "../api/client";
import { formHelper } from "../helpers";

const REDUCER_NAME = "user";

const LOGIN_REQUEST = "USER/LOGIN_REQUEST";
const LOGIN_SUCCSESS = "USER/LOGIN_SUCCESS";
const REGISTER_REQUEST = "USER/REGISTER_REQUEST";
const REGISTER_SUCCESS = "USER/REGISTER_SUCCESS";
const SET_USER = "USER/SET_USER";
const LOG_OUT = "USER/LOG_OUT";
const SET_FROM_VALUE = "USER/SET_FROM_VALUE";
export const registerRequest = createAction(REGISTER_REQUEST);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const loginRequest = createAction(LOGIN_REQUEST);
export const loginSuccess = createAction(LOGIN_SUCCSESS);
export const setUser = createAction(SET_USER);
export const setFormValue = createAction(SET_FROM_VALUE);
export const logOut = createAction(LOG_OUT);

const formFields = {
  id: {
    value: "",
    isValid: true,
    readOnly: true,
    fieldType: "label"
  },
  name: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { minLength: 5, maxLength: 20, isRequired: true },
    fieldType: "label"
  },
  password: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { minLength: 3, maxLength: 20, isRequired: true },
    fieldType: "label"
  },
  secondName: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { minLength: 5, maxLength: 20, isRequired: true },
    fieldType: "label"
  },
  login: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { minLength: 5, maxLength: 20, isRequired: true },
    fieldType: "label"
  },
  dateOfBirth: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { isRequired: true },
    fieldType: "label"
  }
};
const initialState = {
  load: false,
  loadRegister: false,
  formFields,
  fields: {
    name: "",
    password: "",
    secondName: "",
    login: "",
    dateOfBir: ""
  },
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
    }),
    [setFormValue]: formHelper.setCreateLotValueAction("formFields")
  },
  initialState
);

export const userSelector = state => {
  return state[REDUCER_NAME];
};
export const fildsSelector = state => state[REDUCER_NAME].fields;
export const formFieldsSelector = state => state[REDUCER_NAME].formFields;
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

      const formFields = yield select(formFieldsSelector);

      const responsedFields = {
        name: { ...formFields.name, value: data.data.name },
        id: { ...formFields.id, value: data.data.id },
        secondName: { ...formFields.secondName, value: data.data.secondName },
        login: { ...formFields.login, value: data.data.login },
        dateOfBirth: { ...formFields.dateOfBirth, value: data.data.dateOfBirth }
      };

      yield put(
        setUser({
          token: data.token,
          fields: data.data,
          formfields: { ...responsedFields }
        })
      );
      yield put(loginSuccess());
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: { token: data.token, fields: data.data, formFields: { ...responsedFields } }
        })
      );
    } catch (e) {
      console.error("authentication/auth", e);
      yield put(loginSuccess());
    }
  }
}

export function* registerRequestSaga() {
  while (true) {
    yield take(registerRequest);
    const formFields = yield select(formFieldsSelector);

    const formFieldsArray = Object.entries(formFields);

    for (let i = 0; i < formFieldsArray.length; i++) {
      const [key, { value }] = formFieldsArray[i];

      yield put(setFormValue({ key, value }));
    }

    try {
      const data = yield call(apiClient, {
        params: { ...formHelper.accumulateFields(formFields) },
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
