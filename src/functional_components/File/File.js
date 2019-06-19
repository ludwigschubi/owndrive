import React from 'react';
import styles from './File.module.css';
export default function File({
    currPath,
    onClick,
    image,
    label,
    selectedItem,
}) {
    const imageTypes = ['ico', 'png', 'jpeg', 'jpg'];
    const isImage = imageTypes.indexOf(label.split('.')[1]) > -1;
    if (isImage) {
        return (
            <div
                className={styles.container}
                style={selectedItem ? {opacity: 0.5} : undefined}
                onClick={onClick}
            >
                <div className={styles.innerContainer}>
                    <div className={styles.iconContainer}>
                        <img
                            className={styles.thumbnail}
                            src={currPath + label}
                        />
                        <img className={styles.icon} src={image} />
                    </div>
                    <p>{label}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={styles.container}
                style={selectedItem ? {opacity: 0.5} : undefined}
                onClick={onClick}
            >
                <div className={styles.innerContainer}>
                    <img className={styles.icon} src={image} />
                    <p className={styles.label}>{label}</p>
                </div>
            </div>
        );
    }
}
