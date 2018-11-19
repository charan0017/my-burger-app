import * as actionTypes from './actions-types';

export const authStart = () => ({
    type: actionTypes.AUTH_START,
});

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error,
});

export const authLogoutInit = () => ({
    type: actionTypes.AUTH_LOGOUT_INIT,
});

export const authLogout = () => ({
    type: actionTypes.AUTH_LOGOUT,
});

export const checkAuthTimeout = (expirationTime) => ({
    type: actionTypes.CHECK_AUTH_TIMEOUT,
    expirationTime,
});

export const authUser = (email, password, isSignUp) => ({
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignUp,
});

export const setAuthRedirectPath = (redirectPath) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    redirectPath,
});

export const checkAuthState = () => ({
    type: actionTypes.CHECK_AUTH_STATE,
});
