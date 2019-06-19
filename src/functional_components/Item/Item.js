import React from 'react';
import styles from './Item.module.css';
import {Menu, Separator, Submenu, MenuProvider, Item} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';

const MENU_TYPE = 'SIMPLE';

const onClick = (event, props) => {
    console.log('Replace me with something useful', event, props);
};

const MyAwesomeMenu = () => (
    <Menu id="test">
        <Item onClick={onClick}>Lorem</Item>
        <Item onClick={onClick}>Ipsum</Item>
        <Separator />
        <Item disabled>Dolor</Item>
        <Separator />
        <Submenu label="Foobar">
            <Item onClick={onClick}>Foo</Item>
            <Item onClick={onClick}>Bar</Item>
        </Submenu>
    </Menu>
);

const MyItem = ({image, label, onClick, selectedItem}) => {
    return (
        <div>
            <MenuProvider id="test">
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
            </MenuProvider>
            {MyAwesomeMenu()}
            {/* <Menu id="test">
                <ContextItem onClick={dummy}>
                    <div className={styles.contextItem}>Delete</div>
                </ContextItem>
                <ContextItem onClick={dummy}>
                    <div className={styles.contextItem}>Info</div>
                </ContextItem>
                <ContextItem onClick={dummy}>
                    <div className={styles.contextItem}>Access</div>
                </ContextItem>
                <ContextItem onClick={dummy}>
                    <div className={styles.contextItem}>Rename</div>
                </ContextItem>
                <Separator />
                <ContextItem onClick={dummy}>
                    <div className={styles.contextItem}>Rename</div>
                </ContextItem>
            </Menu> */}
        </div>
    );
};

export default MyItem;
