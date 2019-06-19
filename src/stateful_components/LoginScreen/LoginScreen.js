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
            <Container>
                <p className={styles.text}> Please login for further steps </p>
            </Container>
        );
    }
}

export default LoginScreen;
