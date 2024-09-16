import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { deleteUpdateProjectReducer, devspaceReducer, getAllProjectReducer, singleProductReducer, viewsReducer } from './redux/reducers/devspaceReducer';
import { profileReducer, singleUserDetailReducer, userReducer } from './redux/reducers/userReducer';

const reducer = combineReducers({
    pushProject: devspaceReducer,
    singleProduct: singleProductReducer,
    getAllProject: getAllProjectReducer,
    deleteAndUpdate: deleteUpdateProjectReducer,
    views: viewsReducer,
    user: userReducer,
    updateProfile:profileReducer,
    singleUser:singleUserDetailReducer
});

const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;

