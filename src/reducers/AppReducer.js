import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_WEBID,
    FETCH_FRIENDS,
    FETCH_FRIENDS_SUCCESS,
    FETCH_FRIENDS_FAIL,
    FETCH_FOLDER_TREE,
    FETCH_FOLDER_TREE_SUCCESS,
    FETCH_FOLDER_TREE_FAIL,
    SET_CURRENT_PATH,
    SET_CURRENT_ITEMS,
} from '../actions/types';

const INITIAL_STATE = {
    webId: null,
    user: null,
    loadLogin: false,
    loadUser: false,
    loadFriends: false,
    loadFolderTree: false,
    error: null,
    contacts: null,
    session: null,
    currentPath: null,
    currentItems: null,
    currentFolderTree: null,

    // [
    //     {
    //         name: 'testdata',
    //         webId: 'https://bejow.solid.community/profile/card#me',
    //     },
    //     {
    //         name: 'testdata2',
    //         webId: 'https://bejow.solid.community/profile/card#me',
    //     },
    // ],
};

export default (state = INITIAL_STATE, action) => {
    const {payload, type} = action;
    console.log('App Reducer got action: ', type, '\nValue: ', payload);
    switch (type) {
        case LOGIN:
            return {...state, loadLogin: true};
        case LOGIN_SUCCESS:
            return {
                ...state,
                loadLogin: false,
                webId: payload.webId,
                session: payload,
            };
        case LOGIN_FAIL:
            return {...state, loadLogin: false, error: payload};
        case FETCH_USER:
            return {...state, loadUser: true};
        case FETCH_USER_SUCCESS:
            return {...state, loadUser: false, user: payload};
        case FETCH_USER_FAIL:
            return {...state, loadUser: false, error: payload};
        case FETCH_FRIENDS:
            return {...state, loadFriends: true};
        case FETCH_FRIENDS_SUCCESS:
            return {...state, loadFriends: false, contacts: payload};
        case FETCH_FRIENDS_FAIL:
            return {...state, loadFriends: false, error: payload};
        case SET_WEBID:
            return {...state, webId: payload};
        case SET_CURRENT_PATH:
            return {...state, currentPath: payload};
        case SET_CURRENT_ITEMS:
            return {...state, currentItems: payload};
        case FETCH_FOLDER_TREE:
            return {...state, loadFolder: true};
        case FETCH_FOLDER_TREE_SUCCESS:
            return {...state, loadFolder: false, currentFolderTree: payload};
        case FETCH_FOLDER_TREE_FAIL:
            return {...state, loadFolder: false, error: payload};
        default:
            return state;
    }
};
