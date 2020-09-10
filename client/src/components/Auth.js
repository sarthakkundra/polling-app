import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import {authUser, logout } from '../store/actions/auth';

const Auth = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const changeUsername = (e) => {
    
        setUsername(e.target.value);
    }
    
    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        const {authType} = props;

        props.authUser(authType, { username, password })
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="username">username</label>
                <input type="text" value={username} name="username" onChange={changeUsername} />
                <label htmlFor="password">password</label>
                <input type="password" value={password} name="password" onChange={changePassword} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default connect(null, {authUser, logout})(Auth);
