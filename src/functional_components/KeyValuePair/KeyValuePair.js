import React, { useState } from 'react';
import styles from './KeyValuePair.module.css';
import classNames from 'classnames';
export default function KeyValuePair({
    keyVal,
    values,
    onUpdate,
    onEdit,
    currentValues,
    webId,
}) {
    const [isEditable, setEditable] = useState(false);
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
                                    setComplete(undefined);
                                    setRow(index);
                                    setEditable(true);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div>
                        <input
                            className={classNames(styles.value)}
                            key={values}
                            placeholder={values}
                            onInput={(e) => {
                                onEdit(e.target.value);
                                setComplete(undefined);
                                setEditable(true);
                            }}
                            disabled={keyVal === 'webId' ? true : false}
                        ></input>
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
                        Array.isArray(values) ? [currentValues] : currentValues,
                        Array.isArray(values) ? values[row] : values,
                        webId
                    )
                        .then(() => {
                            setComplete(true);
                            setEditable(!isEditable);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }}
            >
                ✓
            </div>
            {isComplete ? (
                <p className={styles.complete}>Changes applied.</p>
            ) : isComplete === false ? (
                <p className={styles.complete}>Changes could not be applied.</p>
            ) : (
                undefined
            )}
        </div>
    );
}
