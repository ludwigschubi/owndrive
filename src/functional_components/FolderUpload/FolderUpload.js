import React from 'react';
import styles from './FolderUpload.module.css';
import icon from './FolderUpload.png';

const FolderUpload = (props) => {
    return (
        <label htmlFor="folderUpload">
            <img src={icon} className={styles.icon} alt="file upload icon"/>
            <input
                id="folderUpload"
                // name="fileUpload"
                type="file"
                webkitdirectory={true}
                directory={true}
                multiple={true}
                style={{ display: 'none' }}
                onChange={props.onChange}
                accept="*/*"
            />
        </label>
    );
};

export default FolderUpload;
