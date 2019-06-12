import React from "react";
import styles from "./FileUpload.module.css";
import icon from "./FileUpload.png";

const FileUpload = props => {
  return (
      <img src={icon} className={styles.icon}>
      </img>
  );
};

export default FileUpload;
