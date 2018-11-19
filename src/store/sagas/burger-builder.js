import { put } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from '../../axios-orders';

export function* initIngredientsSaga(action) {
    try {
        const res = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(res.data));
    } catch (e) {
        yield put(actions.fetchIngredientsFailed());
    }
}
