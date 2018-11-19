import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actions-types';
import { authLogoutSaga, checkAuthTimeoutSaga, authUserSaga, checkAuthStateSaga } from './auth';
import { initIngredientsSaga } from './burger-builder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_LOGOUT_INIT, authLogoutSaga),
        takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga),
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}
