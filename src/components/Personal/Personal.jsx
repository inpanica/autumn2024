import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import Input from '../Input/Input';
import TextArea from '../Textarea/Textarea';
import './Personal.css';
import DateTimeInput from '../DateTimeInput/DateTimeInput';
import SelectInput from '../SelectInput/SelectInput';
import NumberInput from '../NumberInput/NumberInput';
import Error from '../Error/Errror';
import { getGoals, postGoal } from '../../levelActions';

const Personal = ({ user, setUser }) => {

    const [goals, setGoals] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState('');
    const [type, setType] = useState('');
    const [steps, setSteps] = useState('');
    const [sleep, setSleep] = useState('');



    useEffect(() => {
        getMyGoals();
    }, [])

    const getMyGoals = async () => {
        const response = await getGoals();
        if (response.status === 200) {
            setGoals(response.data)
        }
    }

    const onSubmit = async () => {
        if (!name || !desc || !start || !end || !type || (type === "sleep" && !sleep) || (type === "steps" && !steps)) {
            setErrorMessage("Все поля должны быть заполнены!");
        }
        else if (start > end) {
            setErrorMessage("Дата начала должна быть раньше даты окончания.");
        }
        else {

            const data = {
                name: name,
                desc: desc,
                end: end.toISOString(),
                start: start.toISOString(),
                type: type,
                status: "",
                creator: user.name + " " + user.surname
            }

            if (type === "steps") {
                data.steps = steps;
            }
            else if (type === "sleep") {
                data.sleep_millis = sleep * 60 * 60 * 1000
            }
            console.log(data);

            const response = await postGoal(data);
            console.log(response);
            if (response.status === 201) {
                alert("Цель успешно добавлен!")
                setName('')
                setDesc('')
                setEnd(null)
                setStart(null)
                setType('')
                setIsAdding(false)
                getMyGoals();
            }
        }
    }

    return (
        <div className="ctn">
            <Card maxWidth={500}>
                <h2 className="main-title">Личные цели</h2>
                <div className="personal-wrapper">
                    {goals.map((goal) => {
                        return (
                            <Card className="goal-card" key={goal.id_g}>
                                <h2 className="main-title">{goal.name}</h2>
                                <p className="main-text">{goal.desc}</p>
                                {
                                    goal.type === "steps" &&
                                    <p className="main-text">Шаги, {goal.steps}</p>
                                }
                                {
                                    goal.type === "sleep" &&
                                    <p className="main-text">Сон, {goal.sleep_millis / 3600000} часов</p>
                                }
                                <div className="challenge-time-ctn">
                                    <p className="main-text">Старт: </p>
                                    <p className="main-desc">
                                        {goal.start.toString().split('+')[0]}
                                    </p>
                                </div>
                                <div className="challenge-time-ctn">
                                    <p className="main-text">Завершение: </p>
                                    <p className="main-desc">
                                        {goal.end.toString().split('+')[0]}
                                    </p>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </Card>
            <Card maxWidth={500}>
                <>
                    {isAdding ?
                        <>
                            <h2 className="main-title"> Добавить цель</h2>
                            <Input
                                fullWidth={true}
                                placeholder="Название"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            />
                            <TextArea
                                placeholder='Описание'
                                value={desc}
                                onChange={(e) => { setDesc(e.target.value) }}
                                fullWidth={true}
                            ></TextArea>
                            <DateTimeInput
                                placeholder="Дата начала"
                                fullWidth={true}
                                value={start}
                                onChange={(date) => { setStart(date) }}
                            ></DateTimeInput>
                            <DateTimeInput
                                placeholder="Дата окончания"
                                fullWidth={true}
                                value={end}
                                onChange={(date) => { setEnd(date) }}
                            ></DateTimeInput>
                            <SelectInput
                                placeholder="Тип челленджа"
                                options={[
                                    { value: 'steps', label: 'Шаги' },
                                    { value: 'sleep', label: 'Сон' },
                                    { value: 'other', label: 'Прочее' },
                                ]}
                                value={type}
                                onChange={(type) => { setType(type) }}
                            ></SelectInput>
                            {
                                type === "steps" &&
                                <NumberInput
                                    placeholder='Колличество шагов'
                                    fullWidth={true}
                                    value={steps}
                                    onChange={(e) => { setSteps(e.target.value) }}
                                    min={1}
                                ></NumberInput>
                            }
                            {
                                type === "sleep" &&
                                <NumberInput
                                    placeholder='Продолжительность сна (в часах)'
                                    fullWidth={true}
                                    value={sleep}
                                    onChange={(e) => { setSleep(e.target.value) }}
                                    min={1}
                                ></NumberInput>
                            }
                            <Error>{errorMessage}</Error>
                            <Button onClick={onSubmit} colored={true} fullWidth={true}>Отправить</Button>
                            <Button onClick={() => { setIsAdding(false) }} fullWidth={true}>Закрыть</Button>
                        </> :
                        <Button onClick={() => { setIsAdding(true) }} fullWidth={true}>{user.is_admin ? "Добавить" : "Предложить"} челлендж</Button>
                    }
                </>
            </Card>
        </div>
    );
};

export default Personal;
