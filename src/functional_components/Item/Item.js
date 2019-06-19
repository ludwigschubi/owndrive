import React from 'react';
import styles from './Item.module.css';
import {ContextMenuTrigger, ContextMenu, MenuItem} from 'react-contextmenu';

const MENU_TYPE = 'SIMPLE';

const dummy = () => {
    console.log('Replace me with something useful');
};

const Item = ({image, label, onClick, selectedItem}) => {
    return (
        <div>
            <ContextMenuTrigger id={MENU_TYPE}>
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
            </ContextMenuTrigger>
            <ContextMenu id={MENU_TYPE} className={styles.contextMenu}>
                <MenuItem data={{item: 'item 1'}}>
                    <div
                        onClick={() => console.log('test')}
                        className={styles.contextItem}
                    >
                        Rename
                    </div>
                </MenuItem>
                <MenuItem onClick={dummy} data={{item: 'item 2'}}>
                    <div className={styles.contextItem}>Delete</div>
                </MenuItem>
                <MenuItem onClick={dummy} data={{item: 'item 3'}}>
                    <div className={styles.contextItem}>Info</div>
                </MenuItem>
                <MenuItem onClick={dummy} data={{item: 'item 4'}}>
                    <div className={styles.contextItem}>Access</div>
                </MenuItem>
                <MenuItem onClick={dummy} data={{item: 'item 5'}}>
                    <div className={styles.contextItem}>Rename</div>
                </MenuItem>
                <MenuItem divider />
                <MenuItem onClick={dummy} data={{item: 'item 6'}}>
                    <div className={styles.contextItem}>Rename</div>
                </MenuItem>
            </ContextMenu>
        </div>
    );
};

export default Item;
