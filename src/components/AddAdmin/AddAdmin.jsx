import React, { useEffect, useState, useRef } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Error from '../Error/Errror';
import { loginUser, registerUser, setUserPhoto } from '../../actions';


const AddAdmin = ({}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!firstName || !lastName) {
            setErrorMessage('Пожалуйста, укажите имя и фамилию.');
            return;
        }

        else if (!email) {
            setErrorMessage('Пожалуйста, введите ваш email.');
            return;
        }

        else if (!emailPattern.test(email)) {
            setErrorMessage('Введите корректный email.');
            return;
        }

        else if (!password) {
            setErrorMessage('Пожалуйста, задайте пароль.');
            return;
        }

        else if (password.length < 6) {
            setErrorMessage('Пароль должен содержать не менее 6 символов.');
            return;
        }

        else if (password !== repeatPassword) {
            setErrorMessage('Пароли должны совпадать.');
            return;
        }

        else {
            const data = {
                "name": firstName,
                "surname": lastName,
                "email": email,
                "password": password,
                "is_admin": true
            }
            const formData = new FormData();
            const response = await registerUser(data, formData);
            if (response.status === 201){
                alert("Админ успешно добавлен!")
                setEmail('');
                setLastName('');
                setFirstName('');
                setPassword('');
                setRepeatPassword('');
            }
        }
    };

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, password, repeatPassword])

    return (
        <div className="ctn">

            <Card maxWidth={500}>
                <h2 className="main-title">Добавить админа</h2>
                <Input
                    fullWidth={true}
                    placeholder="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <Input
                    fullWidth={true}
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <Input
                    fullWidth={true}
                    placeholder="Почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                />
                <Input
                    fullWidth={true}
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                />
                <Input
                    fullWidth={true}
                    placeholder="Повторите пароль"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    type="password"
                    required
                />
                <Error>{errorMessage}</Error>
                <Button colored={true} fullWidth={true} onClick={handleSubmit}>Подвердить</Button>
            </Card>
        </div>
    );
};

export default AddAdmin;
