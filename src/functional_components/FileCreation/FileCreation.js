import React from 'react';
import styles from './FileCreation.module.css';
import icon from './FileCreation.png';

const FileCreation = (props) => {
    return (
        <img src={icon} className={styles.icon} onClick={() => props.onClick()} alt="file creation icon" />
    );
};

export default FileCreation;
