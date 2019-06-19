import React from 'react';
import styles from './FileUpload.module.css';
import icon from './FileUpload.png';

const FileUpload = (props) => {
    return (
        <label htmlFor="fileUpload">
            <img src={icon} className={styles.icon} alt="file upload icon" />
            <input
                type="file"
                onChange={(e) => {
                    props.onChange(e.target.files);
                }}
                webkitdirectory="true"
                mozdirectory="true"
                msdirectory="true"
                odirectory="true"
                directory="true"
                multiple
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
