import React, {useState} from 'react';
import styles from './ProfileSideBar.module.css';
import classNames from 'classnames';
import closeIcon from '../../assets/icons/close.png';
import {KeyValuePair} from '../KeyValuePair';
import useHover from '../../hooks/useHover';
import editIcon from '../../assets/icons/edit.png';

export default function ProfileSideBar({isExpanded, toggleSidebar, user}) {
    const [isEditable, setEditable] = useState(false);
    const [hoverRef, isHovered] = useHover();
    return (
        <div
            className={classNames(styles.container, {
                [styles.active]: isExpanded,
            })}
        >
            <img
                className={styles.closeButton}
                onClick={toggleSidebar}
                src={closeIcon}
            />
            {user.picture ? (
                <div className={classNames(styles.head, styles.section)}>
                    <div
                        ref={hoverRef}
                        className={styles.profilePicture}
                        style={{backgroundImage: `url(${user.picture})`}}
                    >
                        {isHovered ? (
                            <img src={editIcon} className={styles.editIcon} />
                        ) : null}
                    </div>
                    <div>
                        <p className={styles.name}>{user.name}</p>
                        <p className={styles.job}>{user.job}</p>
                    </div>
                </div>
            ) : null}
            {Object.keys(user).map((key, index) => (
                <KeyValuePair
                    key={key + index}
                    keyVal={key}
                    values={user[key]}
                />
            ))}
            <div className={styles.addButton}>add new category</div>
        </div>
    );
}
