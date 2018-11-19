import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios-orders';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const res = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
        yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
    } catch (err) {
        yield put(actions.purchaseBurgerFail(err));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    try {
        const res = yield axios.get(`orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`);
        const orders = Object.keys(res.data)
            .map(key => ({ ...res.data[key], id: key }));
        yield put(actions.fetchOrdersSuccess(orders));
    } catch (err) {
        yield put(actions.fetchOrdersFail(err));
    }
}
