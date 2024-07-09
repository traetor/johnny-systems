import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/tasks">Tasks</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={() => localStorage.removeItem('token')}>Logout</Link>
        </nav>
    );
}

export default Navbar;