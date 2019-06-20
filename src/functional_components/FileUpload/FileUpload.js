import React from 'react';
import styles from '../FileCreation/FileCreation.module.css';
import fileIcon from './FileUpload.png';
import folderIcon from './FolderUpload.png';

const FileUpload = (props) => {
    return (
        <label htmlFor="fileUpload">
            <img
                src={props.folder ? folderIcon : fileIcon}
                className={props.folder ? styles.icon : styles.icon}
                alt="file upload icon"
            />
            <input
                type="file"
                onChange={(e) => {
                    props.onChange(e.target.files);
                }}
                webkitdirectory={props.folder ? 'true' : undefined}
                mozdirectory={props.folder ? 'true' : undefined}
                msdirectory={props.folder ? 'true' : undefined}
                odirectory={props.folder ? 'true' : undefined}
                directory={props.folder ? 'true' : undefined}
                multiple={props.folder ? 'true' : undefined}
                style={{ display: 'none' }}
                id="fileUpload"
                accept="*/*"
            />
            {/* <input
                // name="fileUpload"
                type="file"
                onChange={props.onChange}
            /> */}
        </label>
    );
};

export default FileUpload;
