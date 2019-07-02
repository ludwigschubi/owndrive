import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_WEBID,
} from './types';
import auth from 'solid-auth-client';
import User from 'your-user';

export const login = (username, password) => {
    return (dispatch) => {
        dispatch({type: LOGIN});
        auth.currentSession()
            .then((session) => {
                if (!session) {
                    auth.login('https://solid.community').then((value) =>
                        console.log('value from, auth login', value)
                    );
                } else {
                    dispatch({type: LOGIN_SUCCESS, payload: session.webId});
                }
            })
            .catch((error) => {
                dispatch({type: LOGIN_FAIL, payload: error});
            });
    };
};

export const setWebId = (webId) => {
    return {type: SET_WEBID, payload: webId};
};

export const fetchUser = (webId) => {
    return (dispatch) => {
        dispatch({type: FETCH_USER});
        const currUser = new User(webId);
        currUser
            .getProfile()
            .then((profile) => {
                dispatch({type: FETCH_USER_SUCCESS, payload: profile});
            })
            .catch((error) =>
                dispatch({type: FETCH_USER_FAIL, payload: error})
            );
    };
};
