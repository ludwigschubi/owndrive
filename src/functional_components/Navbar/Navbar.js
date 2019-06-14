import React from 'react';
import classNames from 'classnames';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavDropdownButton from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Navbar.module.css';

const Navigation = (props) => {
    return (
        <Navbar bg="light" expand="lg">
            <div style={{width: '100%'}}>
                <Row>
                    <Col xs="11" sm="11" md="11" lg="11">
                        <Navbar.Brand href="/" className={styles.brand}>
                            SOLID FILES
                        </Navbar.Brand>
                    </Col>
                    <Col xs="1" sm="1" md="1" lg="1">
                        <NavDropdown
                            id="dropdown"
                            className="float-right"
                            alignRight
                        >
                            {props.webId ? (
                                <div>
                                    <NavDropdown.Item href="home">
                                        Home
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={props.onLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </div>
                            ) : (
                                <NavDropdown.Item onClick={props.onLogin}>
                                    Login
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Col>
                </Row>
            </div>
        </Navbar>
    );
};

export default Navigation;
