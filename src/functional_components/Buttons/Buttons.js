import React from 'react';
import styles from './Buttons.module.css';
import FileUpload from '../FileUpload';
import FolderUpload from '../FileUpload';
import FileCreation from '../FileCreation';

const Buttons = (props) => {
    return (
        <div className={styles.buttonContainer}>
            <FileCreation
                className={styles.icon}
                onClick={props.onFileCreation}
            />
            <FileCreation
                className={styles.icon}
                folder
                onClick={props.onFolderCreation}
            />
            <FileUpload
                className={styles.icon}
                folder
                onClick={props.onFolderUpload}
            />
            <FileUpload className={styles.icon} onClick={props.onFileUpload} />
        </div>
    );
};

export default Buttons;
