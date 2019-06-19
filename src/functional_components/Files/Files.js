import React from 'react';
import styles from './Files.module.css';
import icons from './FileIcons';

const Files = (props) => {
    const files = props.files
        ? props.files.map((file, index) => {
              if (file.split('.').length > 1) {
                  const imageTypes = ['ico', 'png', 'jpeg', 'jpg'];
                  if (imageTypes.indexOf(file.split('.')[1]) > -1) {
                      return (
                          <div
                              className={styles.file}
                              key={'file' + index}
                              onClick={() =>
                                  props.onClick(props.currPath + file)
                              }
                          >
                              <div className={styles.iconContainer}>
                                  <img
                                      alt="thumbnail"
                                      className={styles.thumbnail}
                                      src={props.currPath + file}
                                  />
                                  <img
                                      alt="file icon"
                                      className={styles.fileIcon}
                                      src={icons.blank}
                                  />
                              </div>
                              <p>{file}</p>
                          </div>
                      );
                  }
              }
              return (
                  <div
                      className={styles.file}
                      key={'file' + index}
                      onClick={() => props.onClick(props.currPath + file)}
                  >
                      <img
                          alt="file icon"
                          className={styles.fileIcon}
                          src={icons.blank}
                      />
                      <p>{file}</p>
                  </div>
              );
          })
        : undefined;

    return <ul className={styles.fileList}>{files}</ul>;
};

export default Files;
