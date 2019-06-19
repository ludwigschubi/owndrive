import React from 'react';
import {Item} from '../Item';
import styles from './ItemList.module.css';
import {File} from '../File';
const ItemList = ({
    selectedItems,
    items,
    image,
    onItemClick,
    currPath,
    isFile = false,
}) => {
    const itemComponents = items
        ? items.map((item, index) => {
              return isFile ? (
                  <File
                      selectedItem={
                          selectedItems.includes(
                              currPath + encodeURIComponent(item)
                          )
                              ? true
                              : undefined
                      }
                      key={item + index}
                      image={image}
                      onClick={() =>
                          onItemClick(currPath + encodeURIComponent(item))
                      }
                      label={item}
                      currPath={currPath}
                  />
              ) : (
                  <Item
                      selectedItem={
                          selectedItems.includes(
                              currPath + encodeURIComponent(item) + '/'
                          )
                              ? true
                              : undefined
                      }
                      key={item + index}
                      image={image}
                      onClick={() =>
                          onItemClick(currPath + encodeURIComponent(item) + '/')
                      }
                      currPath={currPath}
                      label={item}
                  />
              );
          })
        : undefined;

    return <div className={styles.listContainer}>{itemComponents}</div>;
};

export default ItemList;
