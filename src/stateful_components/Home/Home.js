import React from "react";

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            webId: props.webId
        }
    }

    render(){
        return <p>This is the Home Screen</p>
    }
}

export default Home;