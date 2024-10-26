import './App.css'
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Card from './components/Card/Card';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import AuthForm from './components/AuthForm/AuthForm';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import { getUser, refreshJwt } from './actions';
import { removeTokens, saveTokens } from './jwt';
import Profile from './components/Profile/Profile';
import Personal from './components/Personal/Personal';
import Leaderboard from './components/Leaderboard/Leaderboard';


const App = () => {

    const [user, setUser] = useState({ 'name': '' });
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        authByToken();
    }, [])

    const authByToken = async () => {
        if (localStorage.getItem('access')) {
            const response = await getUser();
            if (response.status !== 200) {
                const refreshResponse = await refreshJwt();
                if (refreshResponse.status === 200) {
                    saveTokens(refreshResponse.data.refresh, refreshResponse.data.access);
                    authByToken();
                }
                else {
                    removeTokens();
                }
            }
            else {
                setUser(response.data);
                console.log(response.data);

            }
        }
    }

    return (
        <div className='app_ctn'>
            <div className="main_app">
                <Router>
                    <Sidebar user={user} />
                    <Routes>
                        {user.name ? (
                            <>
                                <Route path="/profile" element={<Profile user={user} setUser={setUser}></Profile>} />
                                <Route path="/personal" element={<Personal user={user} setUser={setUser}></Personal>} />
                                <Route path="/challenges" element={<div></div>} />
                                <Route path="/leaderboard" element={<Leaderboard allUsers={allUsers} setAllUsers={setAllUsers} user={user} setUser={setUser}></Leaderboard>} />
                                <Route path="*" element={<Navigate to="/profile" />} />
                            </>
                        ) : (
                            <>
                                <Route path="/register" element={<RegistrationForm authByToken={authByToken} />} />
                                <Route path="/login" element={<AuthForm authByToken={authByToken} />} />
                                <Route path="/" element={
                                    <div className='ctn'>
                                        <img src="./src/assets/Vector.svg" alt="" className='logo' />
                                        <Card>
                                            <h2 className="main-title">Добро пожаловать!</h2>
                                            <p className="main-text">Здесь вы можете принять участие в увлекательных челленджах, которые помогут вам развивать профессиональные навыки, улучшать физическую активность и укреплять командный дух. Создавайте и присоединяйтесь к командам, отслеживайте свой прогресс и получайте награды за достижения. Наша платформа предлагает вам возможность установить личные цели и находить единомышленников. Присоединяйтесь к нам и начинайте свой путь к успеху уже сегодня! Чтобы продолжить, зарегистрируйтесь или войдите в существующий аккаунт</p>
                                        </Card>
                                    </div>
                                } />
                                <Route path="*" element={<Navigate to="/" />} />
                            </>
                        )}
                    </Routes>
                </Router>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default App;

