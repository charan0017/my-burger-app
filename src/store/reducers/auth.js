import * as actionTypes from '../actions/actions-types';
import { combineObjects } from '../../utils';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/',
};

const authStart = (state, action) => combineObjects(state, { loading: true });

const authSuccess = (state, action) => combineObjects(state, {
    token: action.token,
    userId: action.userId,
    loading: false,
});

const authFail = (state, action) => combineObjects(state, {
    error: action.error,
    loading: false,
});

const authLogout = (state, action) => combineObjects(state, initialState);

const setAuthRedirectPath = (state, action) => combineObjects(state, { redirectPath: action.redirectPath });

const auth = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

export default auth;
