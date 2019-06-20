import React from 'react';
import styles from './Window.module.css';
import closeIcon from '../../assets/icons/close.png';

export default function Window({windowName, className, children, onClose}) {
    return (
        <div className={className}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <span className={styles.title}>{windowName}</span>
                    <img
                        className={styles.close}
                        src={closeIcon}
                        onClick={onClose}
                    />
                </div>
                {children}
            </div>
            <div className={styles.opacity} />
        </div>
    );
}
