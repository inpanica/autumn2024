import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import './ChallengeForm.css';
import Error from '../Error/Errror';
import TextArea from '../Textarea/Textarea';
import NumberInput from '../NumberInput/NumberInput';
import DateTimeInput from '../DateTimeInput/DateTimeInput';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../Button/Button';
import { postChallenge } from '../../levelActions';

const ChallengeForm = ({ user, getChallenges, setIsAdding }) => {

    const [name, setName] = useState('');
    const [achivment, setAchivment] = useState('');
    const [desc, setDesc] = useState('');
    const [points, setPoints] = useState('');
    const [start, setStart] = useState(null);
    const [interess, setInteress] = useState('');
    const [end, setEnd] = useState('');
    const [type, setType] = useState('');
    const [steps, setSteps] = useState('');
    const [sleep, setSleep] = useState('');


    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async () => {
        if (!name || !desc || !points || !start || !end || !type || (type === "sleep" && !sleep) || (type === "steps" && !steps)) {
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
                accepted: user.is_admin,
                interest: interess,
                title: achivment,
                points: points,
                type: type,
                creator: user.name + " " + user.surname
            }

            if (type === "steps"){
                data.steps = steps;
            }
            else if (type === "sleep"){
                data.sleep_millis = sleep * 60 * 60 * 1000
            }
            console.log(data);
            
            const response = await postChallenge(data);
            console.log(response);
            if (response.status === 201) {
                if (user.is_admin) {
                    alert("Челлендж успешно добавлен!")
                }
                else {
                    alert("Челлендж успешно предложен! Администраторы проверят его и добавят, если всё в порядке :)")
                }
                setAchivment('')
                setName('')
                setDesc('')
                setEnd(null)
                setStart(null)
                setType('')
                setPoints('')
                setIsAdding(false)
                getChallenges();
            }
        }
    }


    useEffect(() => {
        setErrorMessage('');
    }, [name, desc, points, start, end, type])


    return (
        <div className="challenge-form">
            <h2 className="main-title"> {user.is_admin ? "Добавить" : "Предложить"} челлендж</h2>
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
            <NumberInput
                placeholder='Лимоны за победу'
                fullWidth={true}
                value={points}
                onChange={(e) => { setPoints(e.target.value) }}
                min={1}
            ></NumberInput>
            <Input
                fullWidth={true}
                placeholder="Название достижения при победе"
                value={achivment}
                onChange={(e) => { setAchivment(e.target.value) }}
            />
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

            <SelectInput
                placeholder="Тематика"
                options={[
                    { value: 'films', label: 'Кино' },
                    { value: 'tech', label: 'Технологии' },
                    { value: 'art', label: 'Рисование' },
                    { value: 'communication', label: 'Общение' },
                    { value: 'music', label: 'Музыка' },
                    { value: 'animals', label: 'Животные' },
                    { value: 'literature', label: 'Литература' },
                    { value: 'games', label: 'Игры' },
                    { value: 'cooking', label: 'Кулинария' },
                    { value: 'sport', label: 'Спорт' }
                ]}
                value={interess}
                onChange={(interess) => { setInteress(interess) }}
            ></SelectInput>
            <Error>{errorMessage}</Error>
            <Button onClick={onSubmit} colored={true} fullWidth={true}>Отправить</Button>
        </div>
    );
};

export default ChallengeForm;
