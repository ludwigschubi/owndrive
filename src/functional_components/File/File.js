import React from 'react';
import styles from './File.module.css';
import {Menu, Separator, MenuProvider, Item} from 'react-contexify';
export default function File({
    currPath,
    onClick,
    image,
    label,
    selectedItem,
    onDelete,
    onAccess,
    onRename,
    onInfo,
}) {
    const imageTypes = ['ico', 'png', 'jpeg', 'jpg'];
    const isImage = imageTypes.indexOf(label.split('.')[1]) > -1;
    console.log(currPath + encodeURIComponent(label));
    if (isImage) {
        return (
            <div>
                <MenuProvider id={label + 'contextmenu'}>
                    <div
                        className={styles.container}
                        style={selectedItem ? {opacity: 0.5} : undefined}
                        onClick={onClick}
                    >
                        <div className={styles.innerContainer}>
                            <div className={styles.iconContainer}>
                                <img
                                    className={styles.thumbnail}
                                    src={currPath + encodeURIComponent(label)}
                                />
                                <img className={styles.icon} src={image} />
                            </div>
                            <p>{label}</p>
                        </div>
                    </div>
                    <Menu id={label + 'contextmenu'}>
                        <Item
                            onClick={() => {
                                onDelete(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Delete</div>
                        </Item>
                        <Item
                            onClick={() => {
                                onInfo(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Info</div>
                        </Item>
                        <Item
                            onClick={() => {
                                onAccess(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Access</div>
                        </Item>
                        <Item
                            onClick={() => {
                                onRename(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Rename</div>
                        </Item>
                        <Separator />
                        <Item
                            onClick={() => {
                                onRename(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Rename</div>
                        </Item>
                    </Menu>
                </MenuProvider>
            </div>
        );
    } else {
        return (
            <div>
                <MenuProvider id={label + 'contextmenu1'}>
                    <div
                        className={styles.container}
                        style={selectedItem ? {opacity: 0.5} : undefined}
                        onClick={onClick}
                    >
                        <div className={styles.innerContainer}>
                            <img className={styles.icon} src={image} />
                            <p className={styles.label}>{label}</p>
                        </div>
                    </div>
                    <Menu id={label + 'contextmenu1'}>
                        <Item
                            onClick={() => {
                                onDelete(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Delete</div>
                        </Item>
                        <Item
                            onClick={() => {
                                onInfo(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Info</div>
                        </Item>
                        <Item
                            onClick={() => {
                                onAccess(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Access</div>
                        </Item>
                        <Item
                            onClick={() => {
                                onRename(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Rename</div>
                        </Item>
                        <Separator />
                        <Item
                            onClick={() => {
                                onRename(currPath + encodeURIComponent(label));
                            }}
                        >
                            <div className={styles.contextItem}>Rename</div>
                        </Item>
                    </Menu>
                </MenuProvider>
            </div>
        );
    }
}
