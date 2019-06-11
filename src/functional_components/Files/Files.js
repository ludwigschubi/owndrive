import React from "react";
import styles from "./Files.module.css";

const Files = props => {
  const files = props.files
    ? props.files.map((file, index) => {
        return (
          <li
            className={styles.file}
            key={"file" + index}
            onClick={() => props.onClick(props.currPath + file)}
          >
            <img className={styles.fileIcon} src="https://www.shareicon.net/download/2015/04/11/21345_document.ico" />
            <p>{file}</p>
          </li>
        );
      })
    : undefined;

  return <ul className={styles.fileList}>{files}</ul>;
};

export default Files;
