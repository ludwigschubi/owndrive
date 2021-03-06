import React from 'react';
import styles from './Item.module.css';

const Item = ({ image, label, onClick, selectedItem }) => {
    return (
        <div
            className={styles.container}
            style={selectedItem ? { opacity: 0.5 } : undefined}
            onClick={onClick}
        >
            <div className={styles.innerContainer}>
                <img className={styles.icon} src={image} />
                <p className={styles.label}>{label}</p>
            </div>
        </div>
    );
};

export default Item;
