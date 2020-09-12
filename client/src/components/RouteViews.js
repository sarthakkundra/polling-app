import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthPage from './pages/AuthPage';
import TestPage from './pages/TestPage';

const RouteViews = ({ auth }) => {
    return (
        <div>
            <Switch>
                <Route exact path ="/login">
                    <AuthPage authType={'login'} isAuthenticated={auth.isAuthenticated}/>
                </Route>
                <Route exact path ="/register">
                    <AuthPage authType={'register'} isAuthenticated={auth.isAuthenticated} />
                </Route>
                <Route exact path='/test'>
                    <TestPage />
                </Route>
            </Switch>
        </div>
    )
}

export default withRouter(connect((store) => ({ auth: store.auth }))(RouteViews));
