import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_WEBID,
} from '../actions/types';

const INITIAL_STATE = {
    webId: null,
    user: null,
    loadLogin: false,
    loadUser: false,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    const {payload, type} = action;
    console.log('App Reducer got action: ', type, '\nValue: ', payload);
    switch (type) {
        case LOGIN:
            return {...state, loadLogin: true};
        case LOGIN_SUCCESS:
            return {...state, loadLogin: false, webId: payload};
        case LOGIN_FAIL:
            return {...state, loadLogin: false, error: payload};
        case FETCH_USER:
            return {...state, loadUser: true};
        case FETCH_USER_SUCCESS:
            return {...state, loadUser: false, user: payload};
        case FETCH_USER_FAIL:
            return {...state, loadUser: false, error: payload};
        case SET_WEBID:
            return {...state, webId: payload};
        default:
            return state;
    }
};
