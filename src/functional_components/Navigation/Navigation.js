import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Navigation.module.css';

const Navigation = ({picture, webId, onLogin, onLogout, toggleSidebar}) => {
    return (
        <Navbar bg="light" expand="lg">
            <div style={{width: '100%'}}>
                <Row>
                    <Col xs="6" sm="6" md="6" lg="6">
                        <Navbar.Brand href="/" className={styles.brand}>
                            SOLID FILES
                        </Navbar.Brand>
                        <NavLink to="/home">HOME</NavLink>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="6">
                        <div className={styles.menuWrapper}>
                            {picture ? (
                                <div
                                    onClick={toggleSidebar}
                                    className={styles.profileIcon}
                                    style={{
                                        backgroundImage: 'url(' + picture + ')',
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
                                {webId ? (
                                    <div>
                                        <NavDropdown.Item href="home">
                                            Home
                                        </NavDropdown.Item>
                                        <NavDropdown.Item onClick={onLogout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </div>
                                ) : (
                                    <NavDropdown.Item onClick={onLogin}>
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
