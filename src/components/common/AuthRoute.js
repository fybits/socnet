import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../../app/UserContext';

function AuthRoute({ path, children, unauthOnly = false }) {
    const { authHeader } = useUserContext();
    let authorize = unauthOnly ^ !!authHeader;
    console.log(authorize)
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

export default AuthRoute;
