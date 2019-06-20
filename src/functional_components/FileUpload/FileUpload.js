import React from 'react';
import fileIcon from './FileUpload.png';
import folderIcon from './FolderUpload.png';

const FileUpload = (props) => {
    return (
        <label htmlFor={props.folder ? 'folderUpload' : 'fileUpload'}>
            <img
                src={props.folder ? folderIcon : fileIcon}
                className={props.className}
                alt="file upload icon"
            />
            <input
                type="file"
                onChange={(e) => {
                    console.log(props.onChange);
                    props.onChange(e);
                }}
                webkitdirectory={props.folder ? 'true' : undefined}
                mozdirectory={props.folder ? 'true' : undefined}
                msdirectory={props.folder ? 'true' : undefined}
                odirectory={props.folder ? 'true' : undefined}
                directory={props.folder ? 'true' : undefined}
                multiple={props.folder ? true : false}
                style={{ display: 'none' }}
                id={props.folder ? 'folderUpload' : 'fileUpload'}
                accept="*/*"
            />
        </label>
    );
};

export default FileUpload;
