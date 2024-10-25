import React, { useState } from 'react';
import Card from '../Card/Card';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { FaEdit, FaCheck, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import './Profile.css';
import { config } from '../../config';
import { removeTokens } from '../../jwt';

const Profile = ({ user, setUser, onUpdateProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email] = useState(user.email);
    const [photo, setPhoto] = useState(user.photo);
    const [password, setPassword] = useState('');

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSubmit = () => {
        onUpdateProfile({ name, surname, email, photo, password });
        setIsEditing(false);
    };

    const logout = () => {
        setUser({});
        removeTokens();
    }

    return (
        <div className="ctn">
            <Card maxWidth={500}>
                {!isEditing ? (
                    <div className='user-card-read'>
                        <h2 className="main-title">Мой профиль</h2>
                        <div className="user-info">
                            <img src={config.host + user.photo} alt="User" className="profile-photo" />
                            <div className="user-info_text">
                                <p className="main-text">{name + ' ' + surname}</p>
                                <p className="main-text">{email}</p>
                            </div>
                        </div>
                        <div className="user-buttons">
                            <Button className='icon-btn' onClick={handleEditToggle} style={{ marginRight: '20px' }}><FaEdit /></Button>
                            <Button className='icon-btn' onClick={logout} style={{ backgroundColor: '#CE1818' }}><FaSignOutAlt /></Button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="main-title">Редактировать профиль</h2>
                        <Input
                            fullWidth={true}
                            placeholder="Имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            fullWidth={true}
                            placeholder="Фамилия"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <Input
                            fullWidth={true}
                            placeholder="Email"
                            value={email}
                            disabled
                        />
                        <Input
                            fullWidth={true}
                            placeholder="Новый пароль"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button className='icon-btn' onClick={handleSubmit} style={{ backgroundColor: '#18CE4B', marginRight: '20px' }}><FaCheck /></Button>
                        <Button className='icon-btn' onClick={handleEditToggle} style={{ backgroundColor: '#CE1818' }}><FaTimes /></Button>
                    </>
                )}
            </Card>
            <Card maxWidth={500}>
                <h2 className="main-title">Интересы</h2>

            </Card>
            <Card maxWidth={500}>
                <h2 className="main-title">Достижения</h2>
            </Card>
            <Card maxWidth={500}>
                <h2 className="main-title">Подключить Google Fit</h2>
            </Card>
        </div>
    );
};

export default Profile;
