import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navigation = props => {
  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Navbar.Brand href="/" className={styles.brand}>
        SOLID FILES
      </Navbar.Brand>
      <NavDropdown>
        {props.webId ? (
          <div>
            <NavDropdown.Item href="home">Home</NavDropdown.Item>
            <NavDropdown.Item onClick={props.onLogout}>Logout</NavDropdown.Item>
          </div>
        ) : (
          <NavDropdown.Item onClick={props.onLogin}>Login</NavDropdown.Item>
        )}
      </NavDropdown>
    </Navbar>
  );
};

export default Navigation;
