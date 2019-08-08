import React from 'react';
import styles from './LandingPage.module.css';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId,
        };
    }

    render() {
        return (
            <div className={styles.container}>
                <section>
                    <div className={styles.floatAnimation}>
                        <p className={styles.slogan}>
                            Because the internet deserves better.
                        </p>
                    </div>
                </section>
                <section style={{ backgroundColor: '#333' }}>
                    <p className={styles.mission}>Owning your digital self.</p>
                </section>
            </div>
        );
    }
}

export default LandingPage;
