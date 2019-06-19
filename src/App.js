import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './functional_components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './stateful_components/Home';
import Drive from './stateful_components/Drive';
import LoginScreen from './stateful_components/LoginScreen';
import {ProfileSideBar} from './functional_components/ProfileSideBar';
import auth from 'solid-auth-client';
import User from 'your-user';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: undefined,
            user: undefined,
            isProfileExpanded: false,
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    async login() {
        const session = await auth.currentSession();
        if (!session) {
            await auth.login('https://solid.community');
        } else {
            this.setState({
                webId: session.webId,
            });
        }
    }

    logout() {
        auth.logout().then(() => {
            this.setState({
                webId: undefined,
            });
        });
    }

    toggleSidebar() {
        this.setState({
            isProfileExpanded: !this.state.isProfileExpanded,
        });
    }

    componentDidMount() {
        auth.trackSession((session) => {
            if (!session) {
                console.log('You are logged out');
            } else {
                console.log('You are logged in, fetching data now');
                const currUser = new User(session.webId);
                currUser.getProfile().then((profile) => {
                    this.setState({
                        webId: session.webId,
                        user: profile,
                    });
                });
            }
        });
    }

    render() {
        const {webId, user, isProfileExpanded} = this.state;
        return (
            <Container style={{height: "100%"}}>
                <BrowserRouter>
                    <Navigation
                        toggleSidebar={this.toggleSidebar}
                        onLogout={this.logout}
                        onLogin={this.login}
                        webId={webId}
                        picture={user ? user.picture : undefined}
                    />
                    {webId ? (
                        <ProfileSideBar
                            user={user}
                            toggleSidebar={this.toggleSidebar}
                            isExpanded={isProfileExpanded}
                        />
                    ) : null}
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={
                                user
                                    ? () => (window.location.href = '/home')
                                    : LoginScreen
                            }
                        />
                        <Route
                            path="/home"
                            component={
                                user
                                    ? () => (
                                          <Drive
                                              webId={this.state.webId}
                                          />
                                      )
                                    : LoginScreen
                            }
                        />
                        <Route
                            path="/chat"
                            component={
                                this.state.user
                                    ? () => <Drive webId={this.state.webId} />
                                    : LoginScreen
                            }
                        />
                        <Route
                            path="/drive"
                            component={
                                this.state.user
                                    ? () => <Drive webId={this.state.webId} />
                                    : LoginScreen
                            }
                        />
                    </Switch>
                </BrowserRouter>
            </Container>
        );
    }
}

export default App;
