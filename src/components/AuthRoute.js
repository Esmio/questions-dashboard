import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({component: Component, logged, ...rest}) {
    return (
        <Route 
            {...rest}
            component={
                props => {
                    return logged ? 
                    <Component {...props} /> :
                    <Redirect to="/login" />
                }
            }
        />
    )
}

export default AuthRoute;