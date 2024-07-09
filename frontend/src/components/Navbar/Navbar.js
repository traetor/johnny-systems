import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importujemy kontekst autoryzacji
import './Navbar.scss';

function Navbar() {
    // const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/tasks">Tasks</Link>
            <Link to="/profile">Profile</Link>
            {/*{isLoggedIn ? (*/}
            {/*    <Link to="/" onClick={logout}>Logout</Link>*/}
            {/*) : (*/}
            {/*    <Link to="/register">Register</Link>*/}
            {/*)}*/}
        </nav>
    );
}

export default Navbar;
