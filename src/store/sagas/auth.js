import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as actions from '../actions';
import axios from 'axios';

export function* authLogoutSaga(action) {
    yield call(['localStorage', 'removeItem'], 'token');
    yield call(['localStorage', 'removeItem'], 'expirationDate');
    yield call(['localStorage', 'removeItem'], 'userId');
    yield put(actions.authLogout());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.authLogoutInit());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/${action.isSignUp ? 'signupNewUser' : 'verifyPassword'}?key=AIzaSyB5B9IczqFKnglv9KI3DsxA3oSNa-TmeaE`;
    try {
        const res = yield axios.post(url, authData);
        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('userId', res.data.localId);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield put(actions.authSuccess(res.data.idToken, res.data.localId));
        yield put(actions.checkAuthTimeout(res.data.expiresIn));
    } catch(err) {
        yield put(actions.authFail(err.response.data.error));
    }
}

export function* checkAuthStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.authLogoutInit());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate < new Date()) {
            yield put(actions.authLogoutInit());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        }
    }
}
