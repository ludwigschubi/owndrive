import React from "react";
import styles from "./Folders.module.css";

const Folders = props => {
  const folders = props.folders
    ? props.folders.map((folder, index) => {
        return (
          <li className={styles.folder} onClick={() => props.onClick(props.currPath + folder + "/")} key={"folder" + index}>
          <img className={styles.folderIcon} src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fdtafalonso%2Fyosemite-flat%2F512%2FFolder-icon.png&f=1"/>
          <p
          >
            {folder}
          </p>
          </li>
        );
      })
    : undefined;

  return <ul className={styles.folderList}>{folders}</ul>;
};

export default Folders;
