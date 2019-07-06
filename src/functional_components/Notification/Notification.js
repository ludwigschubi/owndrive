import React from 'react';
import styles from './Notification.module.css';

export default function Notification({ picture, actor, description }) {
    return (
        <div className={styles.container}>
            <div
                style={{ backgroundImage: `url(${picture})` }}
                className={styles.picture}
            />
            <div className={styles.contentContainer}>
                <p className={styles.actor}>{actor}</p>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.accept}>Accept</button>
                <button className={styles.deny}>Deny</button>
                <button className={styles.threeDots}>...</button>
            </div>
        </div>
    );
}
