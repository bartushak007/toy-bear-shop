import { all } from "redux-saga/effects";
import { saga as userSaga } from "../reducers/user";
import { saga as userLotsSaga } from "../reducers/userLots";
import { saga as lotsSaga } from "../reducers/lotsList";

export default function* rootSaga() {
  yield all([userSaga(), userLotsSaga(), lotsSaga()]);
}
