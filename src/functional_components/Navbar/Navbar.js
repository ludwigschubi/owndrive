import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "./Navbar.module.css";

const Navigation = props => {
  return (
      <Navbar bg="light" expand="lg" className={styles.navbar}>
        <Row style={{ width: "100%" }}>
          <Col lg="11">
            <Navbar.Brand href="/" className={styles.brand}>
              SOLID FILES
            </Navbar.Brand>
          </Col>
          <Col lg="1">
            <NavDropdown>
              {props.webId ? (
                <div>
                  <NavDropdown.Item href="home">Home</NavDropdown.Item>
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
      </Navbar>
  );
};

export default Navigation;
