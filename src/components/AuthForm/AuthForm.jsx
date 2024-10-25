import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Card from '../Card/Card';
import './AuthForm.css'
import { loginUser } from '../../actions';
import { saveTokens } from '../../jwt';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setErrorMessage('Пожалуйста, введите ваш email.');
            return;
        }

        else if (!emailPattern.test(email)) {
            setErrorMessage('Введите корректный email.');
            return;
        }

        else if (!password) {
            setErrorMessage('Пожалуйста, введите пароль.');
            return;
        }

        else {
            const loginResponse = await loginUser(email, password);
            if (loginResponse.status == 201) {
                saveTokens(loginResponse.data.refresh, loginResponse.data.access);
                authByToken();
            }
            else{
                setErrorMessage(loginResponse.data)
            }
        }
    };

    return (
        <div className="ctn">

            <Card maxWidth={500}>
                <h2 className="main-title">Авторизация</h2>
                <form onSubmit={handleSubmit}>
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
                    <Button colored={true} fullWidth={true} type='submit'>Войти</Button>
                </form>
            </Card>
        </div>
    );
};

export default AuthForm;
