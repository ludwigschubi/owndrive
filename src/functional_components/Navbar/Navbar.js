import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Navbar.module.css';

const Navigation = (props) => {
    return (
        <Navbar bg="light" expand="lg">
            <div style={{ width: '100%' }}>
                <Row>
                    <Col xs="6" sm="6" md="6" lg="6">
                        <Navbar.Brand href="/" className={styles.brand}>
                            SOLID FILES
                        </Navbar.Brand>
                        <NavLink to="/home">HOME</NavLink>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="6">
                        <div className={styles.menuWrapper}>
                            {props.picture ? (
                                <div
                                    className={styles.profileIcon}
                                    style={{
                                        backgroundImage:
                                            'url(' + props.picture + ')',
                                    }}
                                />
                            ) : (
                                ''
                            )}
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
