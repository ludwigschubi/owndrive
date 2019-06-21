import React, {useState} from 'react';
import {Window} from '../Window';
import styles from './ConsentWindow.module.css';
import classNames from 'classnames';

export default function ConsentWindow({
    className,
    selectedItems,
    onSubmit, // requires a function that takes the input value as an argument ==> onSubmit(inputValue)
    onClose,
    onCancel,
    windowName,
    info,
}) {
    return (
        <Window windowName={windowName} onClose={onClose} className={className}>
            <p>{info}</p>
            <div className={styles.buttonBar}>
                <div
                    onClick={onCancel ? onCancel : onClose}
                    className={styles.button}
                >
                    CANCEL
                </div>
                <div
                    onClick={() => {
                        onSubmit(selectedItems);
                        onClose();
                    }}
                    className={classNames(styles.button, styles.confirm)}
                >
                    CONFIRM
                </div>
            </div>
        </Window>
    );
}
