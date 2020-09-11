import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../store/actions';

const Navbar = ({ auth, logout }) => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/login">Login </Link>
                </li>
                <li>
                    <Link to="/register">Regiser </Link>
                </li>
                <li>
                    <a onClick={logout}>logout</a>
                </li>
            {auth.isAuthenticated && (<p>Logged in as {auth.user.username}</p>)}
            </ul>
        </div>
    )
}

export default connect((store) => ({ auth: store.auth }), { logout })(Navbar)
