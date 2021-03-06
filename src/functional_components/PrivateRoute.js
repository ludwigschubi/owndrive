import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, session, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                true ? (
                    Component
                ) : (
                    <Redirect
                        to={{ pathname: '/', state: { from: props.location } }}
                    />
                )
            }
        />
    );
};
