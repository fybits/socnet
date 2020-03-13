import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthRoute(props) {
    const isAuthentificated = useSelector((state) => Boolean(state.authToken));
    const { path, children, unauthOnly } = props;

    let authorize = unauthOnly ^ isAuthentificated;
    return (
        authorize
        ?
        <Route path={path}>
            {children}
        </Route>
        :
        <Redirect to={unauthOnly ? '/' : '/login'}/>
    );
}

AuthRoute.defaultProps = {
    unauthOnly: false,
  }

export default AuthRoute;
