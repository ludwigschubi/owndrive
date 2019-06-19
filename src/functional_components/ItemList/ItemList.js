import React from 'react';
import {Item} from '../Item';
import styles from './ItemList.module.css';
import {File} from '../File';
const ItemList = ({items, image, onItemClick, currPath, isFile = false}) => {
    const itemComponents = items
        ? items.map((item, index) => {
              return isFile ? (
                  <File
                      key={item + index}
                      image={image}
                      onClick={() => onItemClick(currPath + item)}
                      label={item}
                  />
              ) : (
                  <Item
                      key={item + index}
                      image={image}
                      onClick={() => onItemClick(currPath + item + '/')}
                      label={item}
                  />
              );
          })
        : undefined;

    return <div className={styles.listContainer}>{itemComponents}</div>;
};

export default ItemList;
