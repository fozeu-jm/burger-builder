import * as actionTypes from './actionsTypes';
import axios from '../../axios.orders';

export const addIngredients = (name) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredients = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const burgerLoading = (loadState) =>{
    return{
        type: actionTypes.BURGER_LOADING,
        state: loadState
    }
}

export const initIngredients = () => {

    return dispatch =>{
        dispatch(burgerLoading(true));
        axios.get('/ingredients.json').then((response) => {
            dispatch(setIngredients(response.data));
            dispatch(burgerLoading(false));
        }).catch((error) =>{
            console.log(error);
            dispatch(burgerLoading(false));
            //could dispatch an action to do something in case of error
        });
    }
};