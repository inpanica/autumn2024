import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Checkbox from '../CheckBox/CheckBox';
import { Link } from 'react-router-dom';
import { FaEdit, FaCheck, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import './Profile.css';
import { config } from '../../config';
import { removeTokens } from '../../jwt';
import { getInterests, getLevel, getUsersAcheivements, getUsersChallenges, patchInterests } from '../../levelActions';
import Lemon from '../Lemon/Lemon';

const Profile = ({ user, setUser, onUpdateProfile }) => {

    const [achs, setAchs] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [email] = useState(user.email);
    const [photo, setPhoto] = useState(user.photo);
    const [password, setPassword] = useState('');

    const [level, setLevel] = useState(0);

    const [myChallenges, setMyChallenges] = useState([])

    const [interests, setInterests] = useState({
        "sport": false,
        "cooking": false,
        "art": false,
        "tech": false,
        "communication": false,
        "literature": false,
        "animals": false,
        "games": false,
        "music": false,
        "films": false
    })

    const interestsValues = {
        films: 'Кино',
        tech: 'Технологии',
        art: 'Рисование',
        communication: 'Общение',
        music: 'Музыка',
        animals: 'Животные',
        literature: 'Литература',
        games: 'Игры',
        cooking: 'Кулинария',
        sport: 'Спорт'
    };

    const getMyAchs = async () => {
        const response = await getUsersAcheivements();
        if(response.status === 200){
            setAchs(response.data)
        }
    }

    const handleCheckboxChange = async (interest) => {
        setInterests((prevInterests) => ({
            ...prevInterests,
            [interest]: !prevInterests[interest],
        }));
        const response = await patchInterests({ [interest]: !interests[interest] });
    };

    useEffect(() => {
        getMyInterests();
        getMyChallenges();
        getMyAchs();
    }, [])

    useEffect(() => {
        getMyLevel();
    }, [user])

    const getMyLevel = async () => {
        const response = await getLevel();
        setLevel(response.data.level)
    }

    const getMyChallenges = async () => {
        const response = await getUsersChallenges();
        if (response.status === 200) {
            setMyChallenges(response.data);
        }
        console.log(response.data);

    }

    const getMyInterests = async () => {
        const response = await getInterests();
        if (response.status === 200) {
            setInterests(response.data[0]);
        }
    }

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
                                <p className="main-text">{user.name + ' ' + user.surname}</p>
                                <p className="main-text">{user.email}</p>
                                <p className="main-desc">{user.team}</p>
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
                <div className="interess-wrapper">
                    <Checkbox
                        checked={interests.sport}
                        onChange={() => handleCheckboxChange('sport')}
                    >
                        Спорт
                    </Checkbox>
                    <Checkbox
                        checked={interests.cooking}
                        onChange={() => handleCheckboxChange('cooking')}
                    >
                        Кулинария
                    </Checkbox>
                    <Checkbox
                        checked={interests.art}
                        onChange={() => handleCheckboxChange('art')}
                    >
                        Рисование
                    </Checkbox>
                    <Checkbox
                        checked={interests.tech}
                        onChange={() => handleCheckboxChange('tech')}
                    >
                        Технологии
                    </Checkbox>
                    <Checkbox
                        checked={interests.communication}
                        onChange={() => handleCheckboxChange('communication')}
                    >
                        Общение
                    </Checkbox>
                    <Checkbox
                        checked={interests.literature}
                        onChange={() => handleCheckboxChange('literature')}
                    >
                        Литература
                    </Checkbox>
                    <Checkbox
                        checked={interests.animals}
                        onChange={() => handleCheckboxChange('animals')}
                    >
                        Животные
                    </Checkbox>
                    <Checkbox
                        checked={interests.games}
                        onChange={() => handleCheckboxChange('games')}
                    >
                        Игры
                    </Checkbox>
                    <Checkbox
                        checked={interests.music}
                        onChange={() => handleCheckboxChange('music')}
                    >
                        Музыка
                    </Checkbox>
                    <Checkbox
                        checked={interests.films}
                        onChange={() => handleCheckboxChange('films')}
                    >
                        Кино
                    </Checkbox>
                </div>
            </Card>
            <Card maxWidth={500}>
                <h2 className="main-title">Достижения</h2>
                <p className="main-text user-points-wrapper">Счёт: {user.points}<Lemon></Lemon></p>
                <p className="main-text no-margin">Уровень {level}</p>
                <p className="main-desc">{config.roles[level]}</p>
                {
                    achs.map((a, index)=> {
                        return <p key={index} className='main-text'>{index+1}. {a.title}</p>
                    })
                }

            </Card>
            <Card maxWidth={500}>
                <h2 className="main-title">Активные челенджи</h2>
                <div className="challenges-container">
                    {myChallenges.map((challenge) => {
                        if (challenge.accepted) {
                            return (
                                <Link key={challenge.id_ch} Link to={`/challenges/${challenge.id_ch}`
                                } className='link-no-style' >
                                    <Card className="challenge-card">
                                        <h2 className="main-title">{challenge.name}</h2>
                                        <p className="main-text">{challenge.desc}</p>
                                        <p className="main-desc">{interestsValues[challenge.interest]}</p>
                                        {
                                            challenge.type === "steps" &&
                                            <p className="main-text">Шаги, {challenge.steps}</p>
                                        }
                                        {
                                            challenge.type === "sleep" &&
                                            <p className="main-text">Сон, {challenge.sleep_millis / 3600000} часов</p>
                                        }
                                        <p className="main-text point-container">Награда за победу: {challenge.points}<Lemon></Lemon></p>
                                        <div className="challenge-time-ctn">
                                            <p className="main-text">Старт: </p>
                                            <p className="main-desc">
                                                {challenge.start.toString().split('+')[0]}
                                            </p>
                                        </div>
                                        <div className="challenge-time-ctn">
                                            <p className="main-text">Завершение: </p>
                                            <p className="main-desc">
                                                {challenge.end.toString().split('+')[0]}
                                            </p>
                                        </div>
                                        <p className="main-text">Создатель: {challenge.creator}</p>
                                    </Card>
                                </Link>
                            )
                        }
                    })}
                </div>
            </Card>
            <Card maxWidth={500}>
                <h2 className="main-title">Подключить Google Fit</h2>
                <Button fullWidth={true}>Подключиться</Button>
            </Card>
        </div>
    );
};

export default Profile;
