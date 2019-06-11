import React from "react";
import styles from "./Folders.module.css";

const Folders = props => {
  const folders = props.folders
    ? props.folders.map((folder, index) => {
        return (
          <li
            key={"folder" + index}
            onClick={() => props.onClick(props.currPath + folder + "/")}
            className={styles.folder}
          >
            {folder}
          </li>
        );
      })
    : undefined;

  return <ul className={styles.folderList}>{folders}</ul>;
};

export default Folders;
