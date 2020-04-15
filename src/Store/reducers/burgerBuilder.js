import * as actions from '../actions/actionsTypes';


const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    burgerLoading:false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.95,
    cheese: 0.75,
    meat: 2
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT: 
            console.log(action.ingredientName);
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
    /* *************************************************************************** */
        case actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
    /******************************************************************************** */
            case actions.EMPTY_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...initialState.ingredients
                },
                totalPrice: initialState.totalPrice
            };
    /******************************************************************************** */
            case actions.SET_INGREDIENTS:
                return{
                    ...state,
                    ingredients: {
                        salad: action.ingredients.salad,
                        bacon: action.ingredients.bacon,
                        cheese: action.ingredients.cheese,
                        meat: action.ingredients.meat
                    },
                    totalPrice: initialState.totalPrice
                };
                case actions.BURGER_LOADING:
                return{
                    ...state,
                    burgerLoading: action.state
                }
        default:
            return state;
    }
};

export default reducer;