import * as actionTypes from './actionsTypes';

export const addAuth = (authen) => {
    return {
        type: actionTypes.SAVE_AUTH,
        log: authen
    }
};


export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOG_OUT
    }
};


export const saveAuth = (authen) => {
    return dispatch => {
        dispatch(addAuth(authen));
        setTimeout(() => {
            dispatch(logOut());
        }, authen.expiresIn * 1000);
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logOut());
            } else {
                const userId = localStorage.getItem('userId');
                let expTime = (expirationDate.getTime() - new Date().getTime()) / 1000;

                let auth = {
                    token: token,
                    userId: userId,
                    expiresIn: expTime
                }
                dispatch(saveAuth(auth));
            }
        }
    };
};