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
const RESET_CREATE_LOT = "USER_LOTS/RESET_CREATE_LOT";
const CREATE_LOT_REQUEST = "USER_LOTS/CREATE_LOT_REQUEST";
const SET_CREATE_LOT = "USER_LOTS/SET_CREATE_LOT";
const SET_CREATE_LOT_VALUE = "USER_LOTS/SET_CREATE_LOT_VALUE";
const CREATE_LOT_SUCCESS = "USER_LOTS/CREATE_LOT_SUCCESS";
const FILL_IN_CREATE_LOT = "USER_LOTS/FILL_IN_CREATE_LOT";

export const userLotsRequest = createAction(USER_LOTS_REQUEST);
export const userLotsSuccess = createAction(USER_LOTS_SUCCSESS);
export const setUserLots = createAction(SET_USER_LOTS);
export const createLotRequest = createAction(CREATE_LOT_REQUEST);
export const setCreateLot = createAction(SET_CREATE_LOT);
export const fillInCreateLot = createAction(FILL_IN_CREATE_LOT);
export const setCreateLotValue = createAction(SET_CREATE_LOT_VALUE);
export const createLotSuccess = createAction(CREATE_LOT_SUCCESS);
export const reset = createAction(RESET);
export const resetCreateLot = createAction(RESET_CREATE_LOT);

const createLotInitial = {
  productName: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { type: "text", minLength: 5, isRequired: true },
    fieldType: "label"
  },
  description: { value: "" },
  urlImage: { value: "" },
  quantity: { value: "" },
  added: { value: "" },
  characteristic: { value: "" },
  asset: { value: "" },
  price: { value: "" }
};

const initialState = {
  load: false,
  userLots: [],
  createLot: createLotInitial
};

const setCreateLotValueAction = (state, { payload }) => {
  return {
    ...state,
    createLot: {
      ...state.createLot,
      [payload.key]: {
        ...state.createLot[payload.key],
        value: payload.value,
        ...validateFormField({
          validationRules: state.createLot[payload.key].validationRules,
          value: payload.value
        })
      }
    }
  };
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
    },
    [setCreateLot]: state => ({ ...state }),
    [fillInCreateLot]: (state, { payload }) => ({
      ...state,
      createLot: payload
    }),
    [setCreateLotValue]: setCreateLotValueAction,
    [resetCreateLot]: state => ({ ...state, createLot: createLotInitial })
  },
  initialState
);

export const userLotsSelector = state => state[REDUCER_NAME];
export const createLotSelector = state => state[REDUCER_NAME].createLot;

function* getUsersSaga() {
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
export function* userLotsRequestSaga() {
  while (true) {
    yield take(userLotsRequest);
    yield call(getUsersSaga);
  }
}

export function accumulateFields(fields) {
  return Object.entries(fields).reduce(
    (obj, [key, { value }]) => ({
      ...obj,
      [key]: value
    }),
    {}
  );
}

export function* crateLotRequestSaga() {
  while (true) {
    const { payload: id } = yield take(createLotRequest);
    const user = yield select(userSelector);
    const lots = yield select(userLotsSelector);
    const createLot = yield select(createLotSelector);
    try {
      const data = yield apiClient({
        params: {
          ...accumulateFields(createLot),
          user_id: user.id,
          token: user.token
        },
        url: id
          ? `https://shop-app-brtshk.herokuapp.com/api/products/${id}`
          : "https://shop-app-brtshk.herokuapp.com/api/products",
        method: id ? "put" : "post"
      });

      if (data) {
        if (!id) {
          yield put(setUserLots([...lots.userLots, { ...data.data }]));
        }
        // if (id) {

        //   yield put(
        //     setUserLots([
        //       ...lots.userLots.map(({ _id, ...rest }) =>
        //         id === _id ? { ...data.data } : { _id, ...rest }
        //       )
        //     ])
        //   );
        // }
      }
      yield put(createLotSuccess());
      yield put(resetCreateLot());
    } catch (e) {
      console.error("create lot", e);
      yield put(createLotSuccess());
    }
  }
}

function validateFormField({ validationRules, value }) {
  if (validationRules) {
    if (validationRules.isRequired && !value.length) {
      return {
        isValid: false,
        error: `The field is required.`
      };
    }
    if (validationRules.minLength && value.length < validationRules.minLength) {
      return {
        isValid: false,
        error: `The field must be at least ${validationRules.minLength} characters long.`
      };
    }
  }
  return { isValid: true, error: "" };
}

export function* setCreateLotSaga() {
  while (true) {
    const { payload } = yield take(setCreateLot);
    const createLot = yield select(createLotSelector);
    let lots = yield select(userLotsSelector);

    if (!lots.length) {
      yield call(getUsersSaga);
      lots = yield select(userLotsSelector);
    }
    const lot = lots.userLots.filter(({ _id }) => _id === payload)[0];
    if (lot) {
      yield put(
        fillInCreateLot({
          productName: {
            ...createLot.productName,
            value: lot.productName
          },
          description: {
            ...createLot.description,
            value: lot.description
          },
          urlImage: { ...createLot.urlImage, value: lot.urlImage },
          quantity: { ...createLot.quantity, value: lot.quantity },
          added: { ...createLot.added, value: lot.added },
          characteristic: {
            ...createLot.characteristic,
            value: lot.characteristic
          },
          asset: { ...createLot.asset, value: lot.asset },
          price: { ...createLot.price, value: lot.price }
        })
      );
    }
  }
}

export function* saga() {
  yield all([userLotsRequestSaga(), crateLotRequestSaga(), setCreateLotSaga()]);
}
