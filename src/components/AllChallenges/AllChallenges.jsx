import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Card from '../Card/Card';
import './AllChallenges.css'
import ChallengeForm from '../ChallengeForm/ChallengeForm';
import { ImMagicWand } from 'react-icons/im';
import { getInterests } from '../../levelActions';
import Input from '../Input/Input';
import Lemon from '../Lemon/Lemon';
import SearchBar from '../SearchBar/SearchBar';
import Checkbox from '../CheckBox/CheckBox';


const AllChallenges = ({ user, allChallenges, getChallenges }) => {

    const [search, setSearch] = useState('')
    const [interests, setInterests] = useState({})
    const [checkInterest, setCheckInterest] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [filteredByInterests, setFilteredByInterests] = useState([])

    const getMyInterests = async () => {
        const response = await getInterests();
        if (response.status === 200) {
            setInterests(response.data[0]);
        }
    }

    useEffect(() => {
        getChallenges();
        if (!user.is_admin) {
            getMyInterests();
        }
    }, [])

    useEffect(() => {
        const filteredChallenges = allChallenges.filter((challenge) =>
            challenge.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredByInterests(filteredChallenges)

        if (checkInterest) {
            setFilteredByInterests(filteredChallenges.filter((challenge) =>
                interests[challenge.interest] === true
            ));
        }

    }, [search, checkInterest, allChallenges])

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

    return (
        <div className="ctn">
            <SearchBar fullWidth={true} placeholder="Поиск..." value={search} onChange={(e) => { setSearch(e.target.value) }}></SearchBar>
            {
                !(user.is_admin) &&
                <Checkbox checked={checkInterest} onChange={() => { setCheckInterest(!checkInterest) }}>Учесть интересы</Checkbox>
            }
            <Card maxWidth={1000}>
                <h2 className="main-title">Все челленджи</h2>
                <div className="challenges-container">
                    {filteredByInterests.map((challenge) => {
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
                                    </Card>
                                </Link>
                            )
                        }
                    })}
                </div>
            </Card >
            <Card maxWidth={500}>
                <>
                    {isAdding ?
                        <>
                            <ChallengeForm user={user} getChallenges={getChallenges} setIsAdding={setIsAdding}></ChallengeForm>
                            <Button onClick={() => { setIsAdding(false) }} fullWidth={true}>Закрыть</Button>
                        </> :
                        <Button onClick={() => { setIsAdding(true) }} fullWidth={true}>{user.is_admin ? "Добавить" : "Предложить"} челлендж</Button>
                    }
                </>
            </Card>
        </div >
    );
};

export default AllChallenges;
