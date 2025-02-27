import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Leaderboard.css';
import { config } from '../../config';
import { getAllUsers } from '../../actions';
import Lemon from '../Lemon/Lemon';
import fire from '../../assets/Fire.svg'

const Leaderboard = ({ user, setUser, allUsers, setAllUsers }) => {

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const response = await getAllUsers();
        console.log(response.data);
        setAllUsers(response.data);
    };

    return (
        <div className="ctn">
            <Card>
                <h2 className="main-title">Таблица лидеров</h2>
                <p className="main-text">В конце месяца три лучших сотрудника получат призы</p>
                <div className="leaderboard-table">
                    {allUsers
                        .sort((a, b) => b.points - a.points)
                        .map(({ id_u, photo, name, surname, email, points, id_l }, index) => (
                            <UserRow
                                key={id_u}
                                position={index + 1}
                                photo={config.host + photo}
                                name={name}
                                surname={surname}
                                email={email}
                                points={points}
                                id_l={id_l}
                            />
                        ))}
                </div>
            </Card>
        </div>
    );
};

const UserRow = ({ position, photo, name, surname, email, points, id_l }) => (
    <div className="user-row">
        <div className="main-title position">{position}</div>
        {position <= 3 && <img className='leader-fire' src={fire} />}
        <img src={photo} alt="User" className="leaderboard-photo" />
        <p className="main-text user-name-leader">{name + ' ' + surname}</p>
        <p className="main-text user-points">{points} <Lemon></Lemon></p>
        <div className="level-ctn">
            <p className="main-text user_level-leaderboard">Уровень {id_l}</p>
            <p className="main-desc user_level-leaderboard">{config.roles[id_l]}</p>
        </div>
    </div>
);

export default Leaderboard;
