import {
    LOGIN_REQUEST,
    LOGIN_SUCEESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCEESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCEESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCEESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCEESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    SINGLE_USER_DETAILS_REQUEST,
    SINGLE_USER_DETAILS_SUCEESS,
    SINGLE_USER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants';

const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticate: false,
            }
        case LOGIN_SUCEESS:
        case REGISTER_USER_SUCEESS:
        case LOAD_USER_SUCEESS:
            return {
                ...state,
                loading: false,
                isAuthenticate: true,
                user: action.payload.data, // यूजर की जानकारी
                token: action.payload.token, // टोकन को स्टोर करें
                message: action.payload.message, // टोकन को स्टोर करें
            }
        case LOGOUT_USER_SUCEESS:
            return {
                loading: false,
                isAuthenticate: false,
                user: null,
            }
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticate: false,
                user: null,
                error: action.payload,
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticate: false,
                user: null,
                error: action.payload,
            }
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}


const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_PROFILE_SUCEESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case UPDATE_PROFILE_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }

        default:
            return state;
    }
}



const singleUserDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case SINGLE_USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SINGLE_USER_DETAILS_SUCEESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            }
        case SINGLE_USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}



export { userReducer, profileReducer, singleUserDetailReducer };