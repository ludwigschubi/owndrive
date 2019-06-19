import React from 'react';
import styles from './Folders.module.css';

const Folders = (props) => {
    const folders = props.folders
        ? props.folders.map((folder, index) => {
              return (
                  <div
                      className={styles.folder}
                      onClick={() =>
                          props.onClick(props.currPath + folder + '/')
                      }
                      key={'folder' + index}
                  >
                      <img
                          alt="folder icon"
                          className={styles.folderIcon}
                          src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Ficons.iconarchive.com%2Ficons%2Fdtafalonso%2Fyosemite-flat%2F512%2FFolder-icon.png&f=1"
                      />
                      <p>{folder}</p>
                  </div>
              );
          })
        : undefined;

    return <div className={styles.folderList}>{folders}</div>;
};

export default Folders;
