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
    FETCH_FOLDER_TREE,
    FETCH_FOLDER_TREE_SUCCESS,
    FETCH_FOLDER_TREE_FAIL,
    SET_CURRENT_PATH,
    SET_CURRENT_ITEMS,
} from './types';
import auth from 'solid-auth-client';
import User from 'your-user';
import { getCurrentDirectory } from '../utils/url';
import fileUtils from '../utils/fileUtils';

export const login = (username, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN });
        auth.currentSession()
            .then((session) => {
                if (!session) {
                    auth.login('https://owntech.de').then(
                        (value) => console.log('value from, auth login', value)
                        // setSessionInfo(session);
                    );
                } else {
                    dispatch(setSessionInfo(session));
                }
            })
            .catch((error) => {
                dispatch({ type: LOGIN_FAIL, payload: error });
            });
    };
};

const setSessionInfo = (session) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_SUCCESS, payload: session });
        dispatch({ type: SET_WEBID, payload: session.webId });
        dispatch({
            type: SET_CURRENT_PATH,
            payload: session.webId.replace('/profile/card#me', ''),
        });
        dispatch(fetchUser(session.webId));
        dispatch(fetchFolderTree(session.webId.replace('profile/card#me', '')));
    };
};

export const setWebId = (webId) => {
    return { type: SET_WEBID, payload: webId };
};

export const setCurrentPath = (newPath) => {
    return { type: SET_CURRENT_PATH, payload: newPath };
};

export const fetchUser = (webId) => {
    return (dispatch) => {
        console.log('in fetch user', webId);
        dispatch({ type: FETCH_USER });
        const currUser = new User(webId);
        currUser
            .getProfile()
            .then((profile) => {
                dispatch({ type: FETCH_USER_SUCCESS, payload: profile });
            })
            .catch((error) =>
                dispatch({ type: FETCH_USER_FAIL, payload: error })
            );
        console.log('finish');
    };
};

export const fetchContacts = (yourUserObject) => {
    return (dispatch) => {
        dispatch({ type: FETCH_FRIENDS });
        yourUserObject
            .getFriends()
            .then((friends) => {
                dispatch({ type: FETCH_FRIENDS_SUCCESS, payload: friends });
            })
            .catch((error) => {
                dispatch({ type: FETCH_FRIENDS_FAIL, payload: error });
            });
    };
};

export const fetchFolderTree = (url) => {
    return (dispatch) => {
        dispatch({ type: FETCH_FOLDER_TREE });
        fileUtils
            .getFolderFiles(url)
            .then((tree) => {
                dispatch({ type: FETCH_FOLDER_TREE_SUCCESS, payload: tree });
            })
            .catch((error) =>
                dispatch({ type: FETCH_FOLDER_TREE_FAIL, payload: error })
            );
    };
};

const convertFolderUrlToName = (folderUrl) => {
    return folderUrl.split('/').splice(-2)[0];
};

const convertFileUrlToName = (fileUrl) => {
    return fileUrl.split('/').splice(-1)[0];
};

export const getCurrentItems = (urlTree, currentPath) => {
    return (dispatch) => {
        const { folders, files } = getCurrentDirectory(urlTree, currentPath);
        const folderNames = folders.map((folderUrl) => {
            return convertFolderUrlToName(folderUrl);
        });
        const fileNames = files.map((fileUrl) => {
            return convertFileUrlToName(fileUrl);
        });
        dispatch({
            type: SET_CURRENT_ITEMS,
            payload: { folders: folderNames, files: fileNames },
        });
    };
};
