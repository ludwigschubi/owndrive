import React from 'react';
import styles from './ProfileSideBar.module.css';
import classNames from 'classnames';
import editIcon from '../../assets/icons/edit.png';
import closeIcon from '../../assets/icons/close.png';
export default function ProfileSideBar({isExpanded, toggleSidebar, user}) {
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
                        className={styles.profilePicture}
                        style={{backgroundImage: `url(${user.picture})`}}
                    />
                    <div>
                        <p className={styles.name}>{user.name}</p>
                        <p className={styles.job}>{user.job}</p>
                    </div>
                </div>
            ) : null}
            {Object.keys(user).map((key, index) => (
                <div className={styles.section} key={index}>
                    <div className={styles.key}>{key}:</div>
                    <div className={styles.values}>
                        {Array.isArray(user[key]) ? (
                            user[key].map((value, index) => (
                                <div
                                    className={styles.value}
                                    key={value + index}
                                >
                                    {value}
                                </div>
                            ))
                        ) : (
                            <div className={styles.value}>{user[key]}</div>
                        )}
                    </div>
                    <img className={styles.editIcon} src={editIcon} />
                </div>
            ))}
            <div className={styles.addButton}>add new category</div>
        </div>
    );
}
