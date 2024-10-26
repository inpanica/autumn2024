import { useEffect, useState, useRef } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import './ChallengeDetails.css'
import { Link } from 'react-router-dom';
import Lemon from '../Lemon/Lemon';


const ChallengeDetails = ({ challenge, user }) => {

    const interests = {
        films: 'Кино',
        tech: 'Технологии',
        drawing: 'Рисование',
        communication: 'Общение',
        music: 'Музыка',
        animals: 'Животные',
        literature: 'Литература',
        games: 'Игры',
        cooking: 'Кулинария',
        sport: 'Спорт'
    };


    return (
        <div className="ctn">
            <Card>
                <h2 className="main-title">Челлендж "{challenge.name}"</h2>
                <p className="main-text">{challenge.desc}</p>
                <p className="main-desc">Тематика: {interests[challenge.interest]}</p>
                {
                    challenge.type === "steps" &&
                    <p className="main-text">Шаги, {challenge.steps}</p>
                }
                {
                    challenge.type === "sleep" &&
                    <p className="main-text">Сон, {challenge.sleep_millis / 3600000} часов</p>
                }
                <p className="main-text point-container details-point-container">Награда за победу: {challenge.points}<Lemon></Lemon></p>
                <p className="main-desc">+ достижение "{challenge.title}"</p>
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

            {
                challenge.accepted ?
                    <Link to="/admin/all-challenges">
                        <Button>Вернуться ко всем кейсам</Button>
                    </Link>
                    :
                    <Link to="/admin/challenge-requests">
                        <Button>Вернуться к заявкам</Button>
                    </Link>
            }
        </div>
    );
};

export default ChallengeDetails;
