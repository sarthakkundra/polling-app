import { SET_CURRENT_USER } from '../types';

const DEFAULT_STATE = {
    user: {},
    isAuthenticated: false
}

export default (state = DEFAULT_STATE, action) => {

    switch(action.type){
        case SET_CURRENT_USER:
            return{
                user: action.user,
                isAuthenticated: !!Object.keys(action.user).length,
            }

            default:
                return state;
    }
}