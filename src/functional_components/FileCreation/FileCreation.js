import React from 'react';
import styles from './FileCreation.module.css';
import fileIcon from './FileCreation.png';
import folderIcon from './FolderCreation.png';

const FileCreation = (props) => {
    const fileCreationMarkup = props.folder ? (
        <img
            src={folderIcon}
            className={styles.icon}
            onClick={() => props.onClick()}
            alt="file creation icon"
        />
    ) : (
        <img
            src={fileIcon}
            className={styles.icon}
            onClick={() => props.onClick()}
            alt="file creation icon"
        />
    );

    return fileCreationMarkup;
};

export default FileCreation;
