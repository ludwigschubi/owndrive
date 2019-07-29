import React from 'react';
import rdf from 'rdflib';
import styles from './NotificationsPage.module.css';
import { Notification } from '../../functional_components/Notification';
import Container from 'react-bootstrap/Container';
import { connect } from 'react-redux';
import { fetchNotifications } from '../../actions/UserActions';
import fileUtils from '../../utils/fileUtils';
const ns = require('solid-namespace')(rdf);

class NotificationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId,
            notifications: props.notifications,
        };
    }

    componentDidMount() {
        console.log(ns.ldp('contains'));
        const { notifications, webId } = this.props;
        if (notifications) {
            console.log(notifications);
        } else if (webId) {
            fileUtils.getNotificationFiles(webId).then((notifications) => {
                console.log(notifications);
            });
            fetchNotifications(webId);
        }
    }

    render() {
        return (
            <Container className={styles.container}>
                <h3>Notifications</h3>
                <Notification
                    picture="https://ludwigschubert.solid.community/profile/aa.jpeg"
                    actor="ludwigschubert"
                    description="Wants to send you a picture"
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        webId: state.app.webId,
        loadNotifications: state.app.loadNotifications,
        notifications: state.app.notifications,
    };
};

export default connect(
    mapStateToProps,
    { fetchNotifications }
)(NotificationsPage);
