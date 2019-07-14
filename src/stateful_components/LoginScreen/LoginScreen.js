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
                <section className={styles.page}>
                    <div className={styles.floatAnimation}>
                        <p className={styles.slogan}>
                            Because the internet deserves better.
                        </p>{' '}
                    </div>
                </section>
                <section
                    className={styles.page}
                    style={{ backgroundColor: '#333' }}
                >
                    <p className={styles.mission}>Owning your digital self.</p>
                </section>
            </div>
        );
    }
}

export default LoginScreen;
