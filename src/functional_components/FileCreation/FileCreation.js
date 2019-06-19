import React from 'react';
import fileStyles from './FileCreation.module.css';
import folderStyles from './FolderCreation.module.css';
import fileIcon from './FileCreation.png';
import folderIcon from "./FolderCreation.png";

const FileCreation = (props) => {
    const fileCreationMarkup = props.folder ? 
        <img src={folderIcon} className={folderStyles.icon} onClick={() => props.onClick()} alt="file creation icon" /> : <img src={fileIcon} className={fileStyles.icon} onClick={() => props.onClick()} alt="file creation icon" />
    
    return fileCreationMarkup;
};

export default FileCreation;
