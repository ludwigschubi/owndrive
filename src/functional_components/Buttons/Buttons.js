import React, {useState} from 'react';
import styles from './Buttons.module.css';
import FileUpload from '../FileUpload';
import FileCreation from '../FileCreation';
import classNames from 'classnames';
import toggleIcon from '../../assets/icons/dots_vert.png';
const Buttons = (props) => {
    const [isExpanded, setExpanded] = useState(false);
    return (
        <div className={styles.buttonContainer}>
            <FileCreation
                className={classNames(styles.icon, {
                    [styles.expanded]: isExpanded,
                })}
                onClick={props.onFileCreation}
            />
            <FileCreation
                className={classNames(styles.icon, {
                    [styles.expanded]: isExpanded,
                })}
                folder
                onClick={props.onFolderCreation}
            />
            <FileUpload
                className={classNames(styles.icon, {
                    [styles.expanded]: isExpanded,
                })}
                folder
                onClick={props.onFolderUpload}
            />
            <FileUpload
                className={classNames(styles.icon, {
                    [styles.expanded]: isExpanded,
                })}
                onClick={props.onFileUpload}
            />
            <img
                className={classNames(styles.icon, {
                    [styles.expanded]: isExpanded,
                })}
                src={toggleIcon}
                onClick={() => setExpanded(!isExpanded)}
            />
        </div>
    );
};

export default Buttons;
