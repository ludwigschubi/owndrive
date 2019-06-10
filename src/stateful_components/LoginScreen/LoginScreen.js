import React from "react";
import styles from "./LoginScreen.module.css";

class LoginScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            webId: props.webId
        }
    }

    render(){
        return <p className={styles.text}>This is the LoginScreen</p>
    }
}

export default LoginScreen;