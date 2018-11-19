import * as actionTypes from '../actions/actions-types';
import { combineObjects } from '../../utils';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const updateLoadingState = (state, loading) => (combineObjects(state, { loading: !!loading }));

const updatePurchasedState = (state, purchased) => (combineObjects(state, { purchased: !!purchased }));

const purchaseInit = (state, action) => updatePurchasedState(state, false);

const purchaseBurgerStart = (state, action) => updateLoadingState(state, true);

const fetchOrdersStart = (state, action) => updateLoadingState(state, true);

const purchaseBurgerSuccess = (state, action) => combineObjects(state, {
    loading: false,
    orders: state.orders.concat({ ...action.orderData, id: action.orderId }),
    purchased: true,
});

const fetchOrdersSuccess = (state, action) => combineObjects(state, {
    orders: action.orders,
    loading: false,
});

const purchaseBurgerFail = (state, action) => updateLoadingState(state, false);

const fetchOrdersFail = (state, action) => updateLoadingState(state, false);

const order = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }
};

export default order;
