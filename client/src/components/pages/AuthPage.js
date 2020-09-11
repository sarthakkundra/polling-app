import React from 'react'
import { Redirect } from 'react-router-dom';

import Auth from '../Auth';
import Error from '../Error';

const AuthPage = ({ authType, isAuthenticated }) => {
    if(isAuthenticated) {
        return(
        <Redirect to="/" />
        )}
    return (
        <div>
            <Error />
            <Auth authType={authType} />
        </div>
    )
}

export default AuthPage
