import React from 'react';
import styles from './NotificationsPage.module.css';

class NotificationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId,
        };
    }

    render() {
        return (
            <div className={styles.container}>
            </div>
        );
    }
}

export default NotificationsPage;
