import React, { useState } from 'react';
import styles from './ProfileSideBar.module.css';
import classNames from 'classnames';
import closeIcon from '../../assets/icons/close.png';
import { KeyValuePair } from '../KeyValuePair';
import useHover from '../../hooks/useHover';
import editIcon from '../../assets/icons/editProfilePicture.png';
import defaultIcon from '../../assets/icons/defaultUserPic.png';

export default function ProfileSideBar({
    isExpanded,
    toggleSidebar,
    user,
    onProfileUpdate,
    onPictureChange,
}) {
    const [isEditable, setEditable] = useState(false);
    const [hoverRef, isHovered] = useHover();
    const [value, updateValue] = useState('');
    return (
        <div className={isExpanded ? styles.background : undefined}>
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
                <div className={classNames(styles.head, styles.section)}>
                    {user.picture ? (
                        <div
                            ref={hoverRef}
                            className={styles.profilePicture}
                            style={{ backgroundImage: `url(${user.picture})` }}
                        >
                            <input
                                type="file"
                                onChange={onPictureChange}
                                style={{ display: 'none' }}
                                id="pictureUpload"
                                accept="*/*"
                            />
                            {isHovered ? (
                                <label htmlFor="pictureUpload">
                                    <img
                                        src={editIcon}
                                        className={styles.editIcon}
                                    />
                                </label>
                            ) : (
                                <p className={classNames(styles.pictureChange)}>
                                    Click to Change
                                </p>
                            )}
                        </div>
                    ) : (
                        <label
                            htmlFor="pictureUpload"
                            ref={hoverRef}
                            className={styles.label}
                        >
                            <img
                                className={styles.profilePicture}
                                src={defaultIcon}
                            />
                            <input
                                type="file"
                                onChange={onPictureChange}
                                style={{ display: 'none' }}
                                id="pictureUpload"
                                accept="*/*"
                            />
                            <p className={classNames(styles.pictureChange)}>
                                Click to Change
                            </p>
                            {isHovered ? (
                                <label htmlFor="pictureUpload">
                                    <input
                                        type="file"
                                        onChange={onPictureChange}
                                        style={{ display: 'none' }}
                                        id="pictureUpload"
                                        accept="*/*"
                                    />
                                    <img
                                        src={editIcon}
                                        className={styles.editIcon}
                                    />
                                </label>
                            ) : (
                                undefined
                            )}
                        </label>
                    )}
                    <div>
                        <p className={styles.name}>{user.name}</p>
                        <p className={styles.job}>{user.job}</p>
                    </div>
                </div>
                {Object.keys(user).map((key, index) => (
                    <KeyValuePair
                        key={key + index}
                        keyVal={key}
                        currentValues={value}
                        values={user[key]}
                        onUpdate={onProfileUpdate}
                        onEdit={updateValue}
                        webId={user['webId']}
                    />
                ))}
                <div className={styles.addButton}>add new category</div>
            </div>
        </div>
    );
}
