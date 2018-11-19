import * as actionTypes from './actions-types';

export const addIngredient = (ingredientName) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName,
});

export const removeIngredient = (ingredientName) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName,
});

export const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
});

export const setIngredients = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients: {
        salad: ingredients.salad,
        bacon: ingredients.bacon,
        cheese: ingredients.cheese,
        meat: ingredients.meat,
    },
});

export const initIngredients = () => ({
    type: actionTypes.INIT_INGREDIENTS,
});

export const updateBuildingBurger = (buildingBurger) => ({
    type: actionTypes.UPDATE_BUILDING_BURGER,
    buildingBurger,
});
