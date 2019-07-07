import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import User from 'your-user';
import {fetchContacts} from '../../actions/UserActions';
import auth from 'solid-auth-client';

const ContactScreen = (props) => {
    const {webId, contacts, fetchContacts} = props;
    useEffect(() => {
        const user = new User(webId);
        auth.trackSession((session) => {
            if (session) {
                // fetchContacts(user);
            }
        });
    });

    console.log('löalalalal', contacts);
    return (
        <div>
            {webId}
            {contacts ? <div>No contacts</div> : null}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contacts: state.app.contacts,
        webId: state.app.webId,
    };
};

export default connect(
    mapStateToProps,
    {fetchContacts}
)(ContactScreen);
