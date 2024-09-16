import {
    CLEAR_ERRORS, DELETE_PROJECT_FAIL, DELETE_PROJECT_REQUEST, DELETE_PROJECT_RESET, DELETE_PROJECT_SUCEESS, GET_ALL_PROJECT__FAIL, GET_ALL_PROJECT__REQUEST, GET_ALL_PROJECT__SUCEESS, GET_ALL_PROJECT_USER_FAIL, GET_ALL_PROJECT_USER_REQUEST, GET_ALL_PROJECT_USER_SUCEESS, INCREMENT_VIEWS_FAILURE, INCREMENT_VIEWS_REQUEST, INCREMENT_VIEWS_SUCCESS, LIKE_DISLIKE_FAILURE, LIKE_DISLIKE_PROJECT, PUSH_NEW_PROJECT_FAIL, PUSH_NEW_PROJECT_REQUEST, PUSH_NEW_PROJECT_RESET, PUSH_NEW_PROJECT_SUCEESS, UPDATE_PROJECT_DETIALS_FAIL, UPDATE_PROJECT_DETIALS_REQUEST, UPDATE_PROJECT_DETIALS_RESET, UPDATE_PROJECT_DETIALS_SUCEESS, SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCEESS,
    SINGLE_PRODUCT_FAIL,
    DISLIKE_ITEM,
} from '../constants/DevspaceConstants';

const devspaceReducer = (state = { project: {} }, action) => {
    switch (action.type) {
        case PUSH_NEW_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PUSH_NEW_PROJECT_SUCEESS:
            return {
                loading: false,
                isCreated: action.payload.success,
                project: action.payload.data,
                message: action.payload.message,
            }
        case PUSH_NEW_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case PUSH_NEW_PROJECT_RESET:
            return {
                ...state,
                isCreated: false,

            }
        case CLEAR_ERRORS:
            return {
                error: null,
                ...state,
            }

        default:
            return state;
    }
}

const singleProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case SINGLE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }
        case SINGLE_PRODUCT_SUCEESS:
            return {
                loading: false,
                product: action.payload,
            }
        case SINGLE_PRODUCT_FAIL:
            return {
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

const getAllProjectReducer = (state = { projects: [] }, action) => {
    switch (action.type) {
        case GET_ALL_PROJECT_USER_REQUEST:
        case GET_ALL_PROJECT__REQUEST:
            return {
                loading: true,
                projects: [],
            }
        case GET_ALL_PROJECT_USER_SUCEESS:
        case GET_ALL_PROJECT__SUCEESS:
            return {
                loading: false,
                projects: action.payload.data,
            }
        case GET_ALL_PROJECT_USER_FAIL:
        case GET_ALL_PROJECT__FAIL:
            return {
                loading: false,
                error: action.payload,
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




const initialState = {
    views: {},
    loading: false,
    error: null,
};

const viewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_VIEWS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case INCREMENT_VIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                views: {
                    ...state.views,
                    [action.payload.projectID]: action.payload.noOfView,
                },
                error: null,
            };
        case INCREMENT_VIEWS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};





const deleteUpdateProjectReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PROJECT_REQUEST:
        case UPDATE_PROJECT_DETIALS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_PROJECT_SUCEESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_PROJECT_DETIALS_SUCEESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_PROJECT_FAIL:
        case UPDATE_PROJECT_DETIALS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_PROJECT_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_PROJECT_DETIALS_RESET:
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
            return state
    }
}

export { devspaceReducer, getAllProjectReducer, deleteUpdateProjectReducer, viewsReducer, singleProductReducer };
