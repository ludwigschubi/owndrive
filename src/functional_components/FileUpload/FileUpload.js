import React from 'react';
import styles from './FileUpload.module.css';
import icon from './FileUpload.png';

const FileUpload = (props) => {
    return (
        <label htmlFor="fileUpload">
            <img src={icon} className={styles.icon} alt="file upload icon" />
            <input
                id="fileUpload"
                // name="fileUpload"
                type="file"
                style={{ display: 'none' }}
                onChange={props.onChange}
                accept="*/*"
            />
        </label>
    );
};

export default FileUpload;
