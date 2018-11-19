import * as actionTypes from '../actions/actions-types';
import { combineObjects } from '../../utils';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.6,
    meat: 1.3
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    buildingBurger: false,
};

const addIngredient = (state, action) => {
    const updatedState = { ingredients: { ...state.ingredients }, buildingBurger: true };
    updatedState.ingredients[action.ingredientName] += 1;
    updatedState.totalPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
    return combineObjects(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedState = { ingredients: { ...state.ingredients }, buildingBurger: true };
    updatedState.ingredients[action.ingredientName] -= 1;
    updatedState.totalPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
    return combineObjects(state, updatedState);
};

const setIngredients = (state, action) => combineObjects(state, {
    ingredients: action.ingredients,
    totalPrice: initialState.totalPrice,
    error: false,
});

const updateBuildingBurger = (state, action) => combineObjects(state, { buildingBurger: action.buildingBurger });

const fetchIngredientsFailed = (state, action) => combineObjects(state, { error: true });

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        case actionTypes.UPDATE_BUILDING_BURGER: return updateBuildingBurger(state, action);
        default: return state;
    }
};

export default burgerBuilder;
