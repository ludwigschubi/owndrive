import React, {useState} from 'react';
import styles from './KeyValuePair.module.css';
import classNames from 'classnames';
import editIcon from '../../assets/icons/edit.png';
export default function KeyValuePair({keyVal, values}) {
    const [isEditable, setEditable] = useState(false);

    return (
        <div className={styles.section}>
            <div className={styles.key}>{keyVal}:</div>
            <div className={styles.values}>
                {Array.isArray(values) ? (
                    values.map((value, index) => (
                        <div
                            title={value}
                            className={styles.value}
                            key={value + index}
                            contentEditable={isEditable}
                        >
                            {value}
                        </div>
                    ))
                ) : (
                    <div
                        title={values}
                        className={classNames(styles.value, {
                            [styles.editable]: isEditable,
                        })}
                        contentEditable={isEditable}
                    >
                        {values}
                    </div>
                )}
            </div>
            <img
                className={styles.editIcon}
                src={editIcon}
                onClick={() => setEditable(!isEditable)}
            />
        </div>
    );
}
