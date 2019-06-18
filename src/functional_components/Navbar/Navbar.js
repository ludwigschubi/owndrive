import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Navbar.module.css';

const Navigation = (props) => {
    console.log(props.profileImg);
    return (
        <Navbar bg="light" expand="lg">
            <div style={{width: '100%'}}>
                <Row>
                    <Col xs="6" sm="6" md="6" lg="6">
                        <Navbar.Brand href="/" className={styles.brand}>
                            SOLID FILES
                        </Navbar.Brand>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="6">
                        <div className={styles.menuWrapper}>
                            <img
                                className={styles.profileIcon}
                                src={props.profileImg}
                            />
                            {/* <div className={styles.profileIcon}>dummy</div> */}
                            <NavDropdown
                                id="dropdown"
                                alignRight
                                className={[styles.dropdown, 'float-right']}
                            >
                                {props.webId ? (
                                    <div>
                                        <NavDropdown.Item href="home">
                                            Home
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={props.onLogout}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </div>
                                ) : (
                                    <NavDropdown.Item onClick={props.onLogin}>
                                        Login
                                    </NavDropdown.Item>
                                )}
                            </NavDropdown>
                        </div>
                    </Col>
                </Row>
            </div>
        </Navbar>
    );
};

export default Navigation;
