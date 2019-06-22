import React, { useState } from 'react';
import styles from './KeyValuePair.module.css';
import classNames from 'classnames';
import editIcon from '../../assets/icons/edit.png';
import { arrayExpression } from '@babel/types';
export default function KeyValuePair({
    keyVal,
    values,
    onUpdate,
    onEdit,
    currentValues,
}) {
    const [isEditable, setEditable] = useState(undefined);
    const [isComplete, setComplete] = useState(undefined);
    const [row, setRow] = useState(0);

    return (
        <div className={styles.section}>
            <div className={styles.key}>{keyVal}:</div>
            <div className={styles.values}>
                {Array.isArray(values) ? (
                    <div className={styles.multiValue}>
                        {values.map((value, index) => (
                            <input
                                className={classNames(styles.value)}
                                key={value + index}
                                placeholder={value[0]
                                    .replace('tel:', '')
                                    .replace('mailto:', '')}
                                onInput={(e) => {
                                    onEdit(e.target.value);
                                    setRow(index);
                                    setEditable(true);
                                }}
                            />
                        ))}
                        {isComplete ? (
                            <p className={styles.complete}>Changes applied.</p>
                        ) : (
                            undefined
                        )}
                    </div>
                ) : (
                    <div>
                        <input
                            className={classNames(styles.value)}
                            key={values}
                            placeholder={values}
                            onInput={(e) => {
                                onEdit(e.target.value);
                                setEditable(true);
                            }}
                            disabled={keyVal === 'webId' ? true : false}
                        ></input>
                        {isComplete ? (
                            <p className={styles.complete}>Changes applied.</p>
                        ) : (
                            isComplete === false ? <p className={styles.complete}>Changes could not be applied.</p> : undefined
                        )}
                    </div>
                )}
            </div>
            <div
                className={classNames({
                    [styles.editable]: isEditable,
                    [styles.editIcon]: !isEditable,
                })}
                onClick={() => {
                    onUpdate(
                        keyVal,
                        Array.isArray(values)
                            ? [currentValues]
                            : currentValues,
                        Array.isArray(values) ? values[row] : values
                    ).then(() => {
                        setComplete(true);
                        setEditable(!isEditable);
                    }).catch((err) => {
                        console.log(err);
                    });
                }}
            >
                ✓
            </div>
        </div>
    );
}
