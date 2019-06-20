import React from 'react';
import fileIcon from './FileCreation.png';
import folderIcon from './FolderCreation.png';

const FileCreation = (props) => {
    const fileCreationMarkup = props.folder ? (
        <img
            src={folderIcon}
            className={props.className}
            onClick={props.onClick}
            alt="file creation icon"
        />
    ) : (
        <img
            src={fileIcon}
            className={props.className}
            onClick={() => props.onClick()}
            alt="file creation icon"
        />
    );

    return fileCreationMarkup;
};

export default FileCreation;
