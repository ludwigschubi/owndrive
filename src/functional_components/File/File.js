import React from 'react';
import styles from './File.module.css';
import { Menu, Separator, MenuProvider, Item } from 'react-contexify';
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
    const labelFragments = encodeURIComponent(label).split('.');
    const isImage =
        imageTypes.indexOf(labelFragments[labelFragments.length - 1]) > -1;
    if (isImage) {
        return (
            <div>
                <MenuProvider id={label + 'contextmenu'}>
                    <div
                        className={styles.container}
                        style={selectedItem ? { opacity: 0.5 } : undefined}
                        onClick={onClick}
                    >
                        <div className={styles.innerContainer}>
                            <div className={styles.iconContainer}>
                                <img
                                    className={styles.thumbnail}
                                    src={currPath + label}
                                />
                                <img className={styles.icon} src={image} />
                            </div>
                            <p className={styles.label}>{label}</p>
                        </div>
                    </div>
                    <Menu
                        className={styles.contextMenu}
                        id={label + 'contextmenu'}
                    >
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
                <MenuProvider
                    className={styles.contextMenu}
                    id={label + 'contextmenu1'}
                >
                    <div
                        className={styles.container}
                        style={selectedItem ? { opacity: 0.5 } : undefined}
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
