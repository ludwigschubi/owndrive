import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_WEBID,
    FETCH_FRIENDS,
    FETCH_FRIENDS_FAIL,
    FETCH_FRIENDS_SUCCESS,
} from './types';
import rdf from 'rdflib';
import ns from 'solid-namespace';
import auth from 'solid-auth-client';
import User from 'your-user';
import {sortContainments} from '../utils/url';

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
                    dispatch({type: LOGIN_SUCCESS, payload: session});
                    dispatch({type: SET_WEBID, payload: session.webId});
                    dispatch(fetchUser(session.webId));
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
        console.log('in fetch user', webId);
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
        console.log('finish');
    };
};

export const fetchContacts = (yourUserObject) => {
    return (dispatch) => {
        dispatch({type: FETCH_FRIENDS});
        yourUserObject
            .getFriends()
            .then((friends) => {
                dispatch({type: FETCH_FRIENDS_SUCCESS, payload: friends});
            })
            .catch((error) => {
                dispatch({type: FETCH_FRIENDS_FAIL, payload: error});
            });
    };
};

export const fetchFolder = (url) => {
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);

    return fetcher.load(url).then((response) => {
        const containments = store.each(
            rdf.sym(url),
            rdf.sym(ns().ldp('contains')),
            null
        );
        return sortContainments(containments);
    });
};
