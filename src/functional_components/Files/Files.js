import React from "react";
import styles from "./Files.module.css";
import icons from "./FileIcons";

const Files = props => {
  const files = props.files
    ? props.files.map((file, index) => {
        if (file.split(".").length > 1) {
          const imageTypes = ["ico", "png", "jpeg", "jpg"];
          if (imageTypes.indexOf(file.split(".")[1]) > -1) {
            return (
              <li
                className={styles.file}
                key={"file" + index}
                onClick={() => props.onClick(props.currPath + file)}
              >
                <div className={styles.iconContainer}>
                  <img className={styles.thumbnail} src={props.currPath + file}/>
                  <img className={styles.fileIcon} src={icons.blank} />
                </div>
                <p>{file}</p>
              </li>
            );
          }
        }
        return (
          <li
            className={styles.file}
            key={"file" + index}
            onClick={() => props.onClick(props.currPath + file)}
          >
            <img className={styles.fileIcon} src={icons.blank} />
            <p>{file}</p>
          </li>
        );
      })
    : undefined;

  return <ul className={styles.fileList}>{files}</ul>;
};

export default Files;
