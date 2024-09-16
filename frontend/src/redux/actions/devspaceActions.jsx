import axios from 'axios';
import {
    CLEAR_ERRORS, DELETE_PROJECT_FAIL, DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCEESS, GET_ALL_PROJECT__FAIL, GET_ALL_PROJECT__REQUEST, GET_ALL_PROJECT__SUCEESS, GET_ALL_PROJECT_USER_FAIL, GET_ALL_PROJECT_USER_REQUEST, GET_ALL_PROJECT_USER_SUCEESS, INCREMENT_VIEWS_FAILURE, INCREMENT_VIEWS_REQUEST, INCREMENT_VIEWS_SUCCESS, PUSH_NEW_PROJECT_FAIL, PUSH_NEW_PROJECT_REQUEST, PUSH_NEW_PROJECT_SUCEESS, UPDATE_PROJECT_DETIALS_FAIL, UPDATE_PROJECT_DETIALS_REQUEST, UPDATE_PROJECT_DETIALS_SUCEESS, SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCEESS,
    SINGLE_PRODUCT_FAIL,
    LIKE_DISLIKE_FAILURE,
    LIKE_DISLIKE_PROJECT,
} from '../constants/DevspaceConstants';

const pushProjectK = (projectData) => async (dispatch) => {
    try {
        dispatch({ type: PUSH_NEW_PROJECT_REQUEST });
        const response = await axios.post(
            '/api/v1/dev/project/push',
            projectData,
            { headers: { "Content-Type": "application/json" } }
        );
        if (response.data.success) {
            dispatch({
                type: PUSH_NEW_PROJECT_SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: PUSH_NEW_PROJECT_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: PUSH_NEW_PROJECT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

const getAllProjectOfUser = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_PROJECT_USER_REQUEST })
        const response = await axios.get(
            '/api/v1/dev/project/user/get-all' // of Admin
        );
        if (response.data.success) {
            dispatch({
                type: GET_ALL_PROJECT_USER_SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: GET_ALL_PROJECT_USER_FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_PROJECT_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}
const getAllProjectList = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_PROJECT__REQUEST })
        const response = await axios.get(
            '/api/v1/dev/project/get-all' // of Admin
        );
        if (response.data.success) {
            dispatch({
                type: GET_ALL_PROJECT__SUCEESS,
                payload: response.data,
            });
        }
        else {
            dispatch({
                type: GET_ALL_PROJECT__FAIL,
                payload: response.data.message,
            });
        }
    } catch (error) {
        dispatch({
            type: GET_ALL_PROJECT__FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}




const incrementViews = (projectID) => async (dispatch) => {

    try {
        dispatch({ type: INCREMENT_VIEWS_REQUEST });
        const response = await axios.get(
            `/api/v1/dev/project/views/${projectID}`
        ); // Call the backend API to increment views
        console.log("Response: ", response.data);
        if (response.data.success) {
            dispatch({
                type: INCREMENT_VIEWS_SUCCESS,
                payload: {
                    projectID, // Pass the project ID along with the view count
                    noOfView: response.data.data.noOfView,
                },
            });
        }
    } catch (error) {
        dispatch({
            type: INCREMENT_VIEWS_FAILURE,
            payload: error.message,
        });
    }
};

const getSingleProject = (projectId) => async (dispatch) => {


    try {
        dispatch({ type: SINGLE_PRODUCT_REQUEST });
        const response = await axios.get(`/api/v1/dev/project/get/${projectId}`);
        dispatch({
            type: SINGLE_PRODUCT_SUCEESS,
            payload: response.data.data,
        })
    } catch (error) {
        dispatch({
            type: SINGLE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }


}


const updateProject = (id, projectData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROJECT_DETIALS_REQUEST });
        const response = await axios.put(
            `/api/v1/dev/project/update/${id}`,
            projectData,
            { headers: { "Content-Type": "application/json" } }
        );
        dispatch({
            type: UPDATE_PROJECT_DETIALS_SUCEESS,
            payload: response.data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROJECT_DETIALS_FAIL,
            payload: error.response.data.message
        })
    }
}


const deleteProject = (projectID) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PROJECT_REQUEST })
        const response = await axios.delete(
            `/api/v1/dev/project/delete/${projectID}`
        );
        dispatch({
            type: DELETE_PROJECT_SUCEESS,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_PROJECT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// clearing Error
const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
export { pushProjectK, getAllProjectOfUser, getAllProjectList, updateProject, deleteProject, incrementViews, clearError, getSingleProject }