import React from 'react';
import styles from './Buttons.module.css';
import FileUpload from '../FileUpload';
import FolderUpload from '../FileUpload';
import FileCreation from '../FileCreation';

const Buttons = (props) => {
    return (
        <div className={styles.buttonContainer}>
            <FileCreation onClick={props.onFileCreation} />
            <FileCreation folder onClick={props.onFolderCreation} />
            <FileUpload folder onClick={props.onFolderUpload} />
            <FileUpload onClick={props.onFileUpload} />
        </div>
    );
};

export default Buttons;
