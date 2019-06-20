import React from 'react';
import styles from './Item.module.css';
import {Menu, Separator, MenuProvider, Item} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const MENU_TYPE = 'SIMPLE';

const MyItem = ({ image, label, onClick, onDelete, onAccess, onRename, onInfo, selectedItem, currPath}) => {
    return (
        <div>
            <MenuProvider id={label + 'contextmenu'}>
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
                <Menu id={label + 'contextmenu'}>
                    <Item
                        onClick={() => {
                            onDelete(label);
                        }}
                    >
                        <div className={styles.contextItem}>Delete</div>
                    </Item>
                    <Item
                        onClick={() => {
                            onInfo(label);
                        }}
                    >
                        <div className={styles.contextItem}>Info</div>
                    </Item>
                    <Item
                        onClick={() => {
                            onAccess(label);
                        }}
                    >
                        <div className={styles.contextItem}>Access</div>
                    </Item>
                    <Item
                        onClick={() => {
                            onRename(label);
                        }}
                    >
                        <div className={styles.contextItem}>Rename</div>
                    </Item>
                    <Separator />
                    <Item
                        onClick={() => {
                            onRename(label);
                        }}
                    >
                        <div className={styles.contextItem}>Rename</div>
                    </Item>
                </Menu>
            </MenuProvider>
        </div>
    );
};

export default MyItem;
