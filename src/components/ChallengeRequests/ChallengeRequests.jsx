import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import './ChallengeRequests.css'
import Lemon from '../Lemon/Lemon';
import SearchBar from '../SearchBar/SearchBar';
import Button from '../Button/Button';
import { patchChallenge } from '../../levelActions';


const ChallengeRequests = ({ user, allChallenges, getChallenges }) => {

    const [search, setSearch] = useState('')
    const [filteredByInterests, setFilteredByInterests] = useState([])


    useEffect(() => {
        const filteredChallenges = allChallenges.filter((challenge) =>
            (challenge.name.toLowerCase().includes(search.toLowerCase()))
        );

        setFilteredByInterests(filteredChallenges)
    }, [search, allChallenges])

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

    const acceptFunc = async (e, id) => {
        e.preventDefault();
        console.log(id);
        const data = {
            id_ch: id,
            accepted: true
        }
        const response = await patchChallenge(data);
        console.log(response);
        if(response.status === 200){
            getChallenges();
        }
    }

    return (
        <div className="ctn">
            <SearchBar fullWidth={true} placeholder="Поиск..." value={search} onChange={(e) => { setSearch(e.target.value) }}></SearchBar>
            <Card maxWidth={1000}>
                <h2 className="main-title">Предложенные челленджи</h2>
                <div className="challenges-container">
                    {filteredByInterests.map((challenge) => {
                        if (!challenge.accepted) {
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
                                            <p className="main-text">Сон, {challenge.sleep_millis / 3600000 } часов</p>
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
                                        <Button onClick={(e) => {acceptFunc(e, challenge.id_ch)}} colored={true}>Принять</Button>
                                    </Card>
                                </Link>
                            )
                        }
                    })}
                </div>
            </Card >
        </div >
    );
};

export default ChallengeRequests;
