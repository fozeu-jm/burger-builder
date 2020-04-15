import * as actionType from '../actions/actionsTypes';


const initialState = {
    auth: {
        token: null,
        userId: null,
        expiresIn: null
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SAVE_AUTH:
            return {
                ...state,
                auth: action.log
            };
        case actionType.LOG_OUT:
            return {
                ...state,
                auth: {
                    token: null,
                    userId: null,
                    expiresIn: null
                }
            };
        default:
            return state;
    }
}

export default reducer;