import React from 'react';
import styles from './LoginScreen.module.css';
import Container from 'react-bootstrap/Container';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId,
        };
    }

    render() {
        return (
            <Container className={styles.header}>
                <p className={styles.slogan}> Because you deserve better. </p>
                <p className={styles.mission}> For the love of great applications. </p>
            </Container>
        );
    }
}

export default LoginScreen;
