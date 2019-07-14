import React from 'react';
import styles from './LoginScreen.module.css';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId,
        };
    }

    render() {
        return (
            <div className={styles.container}>
                This is a LoginScreen.
            </div>
        );
    }
}

export default LoginScreen;
