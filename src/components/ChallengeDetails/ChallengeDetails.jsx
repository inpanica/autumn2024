import { useEffect, useState, useRef } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import './ChallengeDetails.css'
import { Link } from 'react-router-dom';
import Lemon from '../Lemon/Lemon';
import { addUserToChallenge, deleteChallenge, getChallegensUsers, getUsersChallenges, patchChallenge } from '../../levelActions';
import { config } from '../../config';
import Checkbox from '../CheckBox/CheckBox';
import { addAchivment } from '../../actions';



const ChallengeDetails = ({ challenge, user, getChallenges }) => {

    const [userIds, setUserIds] = useState({})
    const [users, setUsers] = useState([])
    const [isIn, setIsIn] = useState(0)

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

    useEffect(() => {
        getCurrentUsers();
    }, [])

    const getCurrentUsers = async () => {
        const response = await getChallegensUsers({ id_ch: challenge.id_ch });
        if (response.status === 200) {
            setUsers(response.data)
            response.data.map((u) => {
                return setUserIds({ ...userIds, [u.id_u]: false })
            });

        }
    }

    useEffect(() => {
        if (!user.is_admin) {
            if (Object.keys(userIds).includes(user.id_u.toString())) {
                setIsIn(1)
            }
            else {
                setIsIn(0)
            }
        }
        console.log(users);


    }, [userIds])

    const applyToChallenge = async () => {
        const response = await addUserToChallenge({ id_ch: challenge.id_ch });
        if (response.status === 200) {
            alert('Успешно! Теперь вы - участник челенджа "' + challenge.name + '"');
            getCurrentUsers();
        }

    }

    const startStream = async () => {
        const response = await patchChallenge({ id_ch: challenge.id_ch, streaming_now: true });
        if (response.status === 200) {
            getChallenges();
            window.open('https://89.46.131.17:8889/' + challenge.id_ch + '/publish?video-codec=vp8%2F90000&video-width=960&video-height=480', '_blank', 'noopener,noreferrer');
        }
    }

    const watchStream = async () => {
        window.open('https://89.46.131.17:8889/' + challenge.id_ch, '_blank', 'noopener,noreferrer');
    }

    const endStream = async () => {
        const response = await patchChallenge({ id_ch: challenge.id_ch, streaming_now: false });
        if (response.status === 200) {
            getChallenges();
        }
    }

    const endChallenge = async () => {
        let flag = true;
        Object.keys(userIds).map(async (u) => {
            if (u) {
                const response = await addAchivment({id_u: u, id_gach: challenge.id_ch});
                if (response.status !== 200) {
                    flag = false;
                }
            }
        })
        if (flag){
            const response = await deleteChallenge(challenge.id_ch);
            
            getChallenges();
        }
    }

    const UserRow = ({ photo, name, surname, email, id_u }) => (
        <Checkbox
            checked={userIds[id_u]}
            key={id_u}
            onChange={() => { setUserIds({ ...userIds, [id_u]: !userIds[id_u] }) }}
        >
            <div className="user-row">
                <img src={photo} alt="User" className="leaderboard-photo" />
                <div className="level-ctn">
                    <p className="main-text user-name-leader">{name + ' ' + surname}</p>
                    <p className="main-desc user_level-leaderboard">{email}</p>
                </div>
            </div>
        </Checkbox>
    );

    return (

        <div div className="ctn" >
            {
                user.is_adimn ? <>{
                    challenge.accepted ?
                        <Link to="/admin/all-challenges">
                            <Button>Вернуться ко всем челленджам</Button>
                        </Link>
                        :
                        <Link to="/admin/challenge-requests">
                            <Button>Вернуться к заявкам</Button>
                        </Link>
                }</> :
                    <div className='button-user-wrapper'>
                        <Link to="/challenges">
                            <Button>Вернуться ко всем челленджам</Button>
                        </Link>
                        {
                            (!isIn && !user.is_admin) &&
                            <Button onClick={applyToChallenge} colored={true}>Участвовать</Button>
                        }
                        {
                            (user.is_admin && !challenge.streaming_now) &&
                            <Button onClick={startStream} colored={true}>Трансляция</Button>
                        }
                        {
                            (user.is_admin && challenge.streaming_now) &&
                            <Button onClick={endStream} colored={true}>Завершить трансляцию</Button>
                        }
                        {
                            (!user.is_admin && challenge.streaming_now) &&
                            <Button onClick={watchStream} colored={true}>Смотреть трансляцию</Button>
                        }
                    </div>
            }
            <Card>
                <h2 className="main-title">Челлендж "{challenge.name}"</h2>
                <p className="main-text">{Object.keys(userIds).length} участник(ов)</p>
                {
                    isIn ? <p className="main-text">Вы уже участвуете в этом челендже.</p> : <></>
                }
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
                (user.is_admin) &&
                <Card maxWidth={500}>
                    <h2 className="main-title">Участники</h2>
                    <h2 className="main-text">Выберите победителей "{challenge.name}"</h2>
                    {
                        users.map(({ id_u, photo, name, surname, email }, index) => (
                            <UserRow
                                key={id_u}
                                id_u={id_u}
                                photo={config.host + photo}
                                name={name}
                                surname={surname}
                                email={email}
                            />
                        ))}
                    <Button fullWidth={true} colored={true} onClick={endChallenge}>Завершить</Button>
                </Card>
            }

        </div>

    );
};

export default ChallengeDetails;
