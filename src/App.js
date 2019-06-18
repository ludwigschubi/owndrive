import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './functional_components/Navbar';
import Container from 'react-bootstrap/Container';
import Home from './stateful_components/Home';
import LoginScreen from './stateful_components/LoginScreen';
import auth from 'solid-auth-client';
import rdf from 'rdflib';
const VCARD = new rdf.Namespace('http://www.w3.org/2006/vcard/ns#');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: undefined,
            profileImg: null,
        };
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

    loadProfilePicture = () => {
        console.log('in loadProfilePicture');
        const { webId } = this.state;
        const store = rdf.graph();
        const user = store.sym(webId);
        const userProfile = user.doc();

        // const picture = store.any(user, VCARD('hasPhoto'), null, userProfile);
        const fetcher = new rdf.Fetcher(store);
        fetcher.load(userProfile).then(
            (response) => {
                let picture = store.any(user, VCARD('hasPhoto'));
                console.log('fetching profile picture success:', picture);
                this.setState({ profileImg: picture ? picture.value : null });
            },
            (err) => {
                console.log('fetching profile picture error:', err);
                return null;
            }
        );
    };

    componentDidMount() {
        auth.trackSession((session) => {
            if (!session) {
                console.log('You are logged out');
            } else {
                console.log('You are logged in, fetching data now');

                this.setState(
                    {
                        webId: session.webId,
                    },
                    () => this.loadProfilePicture()
                );
            }
        });
    }

    render() {
        const { webId, profileImg } = this.state;
        return (
            <Container>
                <BrowserRouter>
                    <Navigation
                        onLogout={this.logout.bind(this)}
                        onLogin={this.login.bind(this)}
                        webId={webId}
                        profileImg={profileImg}
                    />
                    <Switch>
                        <Route
                            path="/"
                            component={
                                this.state.webId
                                    ? () => <Home webId={this.state.webId} />
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
