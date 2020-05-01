import { handleActions, createAction } from "redux-actions";
import { all, call, put, take, select } from "redux-saga/effects";

import { apiClient } from "../api/client";
import { userSelector, fildsSelector } from "./user";
import { formHelper } from "../helpers";

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
export const oneUserLotRequest = createAction("oneUserLotRequest");
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
    validationRules: { minLength: 5, isRequired: true },
    fieldType: "label",
  },
  description: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { minLength: 10, maxLength: 200, isRequired: true },
    fieldType: "textarea",
  },
  urlImage: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { isRequired: false },
    fieldType: "label",
  },
  quantity: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { type: "number", isRequired: true },
    fieldType: "label",
  },
  added: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { isRequired: true },
    fieldType: "label",
    readOnly: true,
  },
  characteristic: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { minLength: 10, maxLength: 500, isRequired: true },
    fieldType: "label",
  },
  asset: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { isRequired: true },
    fieldType: "label",
  },
  price: {
    value: "",
    isValid: true,
    error: "",
    validationRules: { type: "number", isRequired: true },
    fieldType: "label",
  },
};

const initialState = {
  load: false,
  userLots: { quantity: 0, page: 0, limit: 1, products: [] },
  createLot: createLotInitial,
  createlotLoading: false,
};

const setCreateLotValueAction = formHelper.setCreateLotValueAction("createLot");

export default handleActions(
  {
    [userLotsRequest]: (state) => {
      return { ...state, load: true };
    },
    [oneUserLotRequest]: (state) => {
      return { ...state, load: true };
    },
    [userLotsSuccess]: (state) => {
      return { ...state, load: false };
    },
    [setUserLots]: (state, { payload }) => ({ ...state, userLots: payload }),
    [reset]: () => initialState,
    [createLotRequest]: (state) => {
      return { ...state, createlotLoading: true };
    },
    [createLotSuccess]: (state) => {
      return { ...state, createlotLoading: false };
    },
    [setCreateLot]: (state) => ({ ...state }),
    [fillInCreateLot]: (state, { payload }) => ({
      ...state,
      createLot: payload,
    }),
    [setCreateLotValue]: setCreateLotValueAction,
    [resetCreateLot]: (state) => ({ ...state, createLot: createLotInitial }),
  },
  initialState
);

export const userLotsSelector = (state) => state[REDUCER_NAME];
export const createLotSelector = (state) => state[REDUCER_NAME].createLot;
export const createLotAccumulatedSelector = (state) =>
  formHelper.accumulateFields(state[REDUCER_NAME].createLot);
export const createlotLoadingSelector = (state) =>
  state[REDUCER_NAME].createlotLoading;

function* getLotsOfUserSaga(pageData = {}) {
  yield put(oneUserLotRequest());
  const user = yield select(userSelector);
  const fields = yield select(fildsSelector);
  try {
    const data = yield apiClient({
      params: { token: user.token },
      url: `https://shop-app-brtshk.herokuapp.com/api/products/userid/${fields.id}?token=${user.token}&page=${pageData.page || 0}`,
      method: "get",
    });

    yield put(setUserLots(data.data));
    yield put(userLotsSuccess());
  } catch (e) {
    console.error("get user lots", e);
    yield put(userLotsSuccess());
  }
}

export function* userLotsRequestSaga() {
  while (true) {
    const { payload } = yield take(userLotsRequest);

    yield call(getLotsOfUserSaga, payload);
  }
}

export function* crateLotRequestSaga() {
  while (true) {
    const { payload: id } = yield take(createLotRequest);
    const user = yield select(userSelector);
    const fields = yield select(fildsSelector);
    const lots = yield select(userLotsSelector);
    const createLot = yield select(createLotSelector);

    const createLotArray = Object.entries(createLot);

    for (let i = 0; i < createLotArray.length; i++) {
      const [key, { value }] = createLotArray[i];

      yield put(setCreateLotValue({ key, value }));
    }
    const createLotUpdated = yield select(createLotSelector);

    if (!Object.values(createLotUpdated).some(({ error }) => error)) {
      try {
        const data = yield apiClient({
          params: {
            ...formHelper.accumulateFields(createLot),
            user_id: fields.id,
            token: user.token,
          },
          url: id
            ? `https://shop-app-brtshk.herokuapp.com/api/products/${id}`
            : "https://shop-app-brtshk.herokuapp.com/api/products",
          method: id ? "put" : "post",
        });

        if (data) {
          if (!id) {
            yield put(
              setUserLots([...lots.userLots.products, { ...data.data }])
            );
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
    } else {
      yield put(createLotSuccess());
    }
  }
}

export function* setCreateLotSaga() {
  while (true) {
    const { payload } = yield take(setCreateLot);
    const createLot = yield select(createLotSelector);
    let lots = yield select(userLotsSelector);

    if (!lots.userLots.length) {
      yield call(getLotsOfUserSaga);
      lots = yield select(userLotsSelector);
    }
    const lot = lots.userLots.filter(({ _id }) => _id === payload)[0];
    if (lot) {
      yield put(
        fillInCreateLot({
          productName: {
            ...createLot.productName,
            value: lot.productName,
          },
          description: {
            ...createLot.description,
            value: lot.description,
          },
          urlImage: { ...createLot.urlImage, value: lot.urlImage },
          quantity: { ...createLot.quantity, value: lot.quantity },
          added: { ...createLot.added, value: lot.added },
          characteristic: {
            ...createLot.characteristic,
            value: lot.characteristic,
          },
          asset: { ...createLot.asset, value: lot.asset },
          price: { ...createLot.price, value: lot.price },
        })
      );
    }
  }
}

export function* saga() {
  yield all([userLotsRequestSaga(), crateLotRequestSaga(), setCreateLotSaga()]);
}
