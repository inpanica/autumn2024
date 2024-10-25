import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserPlus, FaSignInAlt, FaUser, FaBullseye, FaFlag, FaTrophy } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ user }) => {
    return (
        <div className="sidebar">
            {user && user.name ? (
                <>
                    <Link to="/profile" className="sidebar-item">
                        <FaUser />
                    </Link>
                    <Link to="/personal" className="sidebar-item">
                        <FaBullseye />
                    </Link>
                    <Link to="/challenges" className="sidebar-item">
                        <FaFlag />
                    </Link>
                    <Link to="/leaderboard" className="sidebar-item">
                        <FaTrophy />
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/" className="sidebar-item">
                        <FaHome />
                    </Link>
                    <Link to="/register" className="sidebar-item">
                        <FaUserPlus />
                    </Link>
                    <Link to="/login" className="sidebar-item">
                        <FaSignInAlt />
                    </Link>
                </>
            )}
        </div>
    );
};

export default Sidebar;
