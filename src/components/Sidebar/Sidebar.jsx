import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserPlus, FaSignInAlt, FaUser, FaBullseye, FaFlag, FaTrophy } from 'react-icons/fa';
import Button from '../Button/Button';
import { FaClipboardList, FaTasks, FaUserShield, FaSignOutAlt} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ user, setUser}) => {

    const logout = () => {
        setUser({});
        removeTokens();
    }

    return (
        <div className="sidebar">
            {user && user.name ? (
                <>
                    {user.is_admin ? (
                        <>
                            <Link to="/admin/challenge-requests" className="sidebar-item">
                                <FaClipboardList />
                            </Link>
                            <Link to="/admin/all-challenges" className="sidebar-item">
                                <FaTasks />
                            </Link>
                            <Link to="/admin/add-admin" className="sidebar-item">
                                <FaUserShield />
                            </Link>
                            <Button className='sidebar-item btn-sidebar' onClick={logout} style={{ backgroundColor: '#CE1818' }}><FaSignOutAlt /></Button>
                        </>
                    ) : (
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
                    )}
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
