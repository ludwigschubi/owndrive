import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./functional_components/Navbar";
import Home from "./stateful_components/Home";
import LoginScreen from "./stateful_components/LoginScreen";
import auth from "solid-auth-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      webId: undefined
    };
  }

  async login() {
    const session = await auth.currentSession();
    if (!session) {
      await auth.login("https://solid.community");
    } else {
      this.setState({
        webId: session.webId
      });
    }
  }

  logout() {
    auth.logout().then(() => {
      this.setState({
        webId: undefined
      });
    });
  }

  componentDidMount() {
    auth.trackSession(session => {
      if (!session) {
        console.log("You are logged out");
      } else {
        console.log("You are logged in, fetching data now");
        this.setState({
          webId: session.webId
        });
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Navigation
          onLogout={this.logout.bind(this)}
          onLogin={this.login.bind(this)}
          webId={this.state.webId}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={this.state.webId ? () => <Home webId={this.state.webId}/> : LoginScreen}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
