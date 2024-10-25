import React, { useEffect, useState, useRef } from 'react';
import Input from '../Input/Input';
import PhotoInput from '../PhotoInput/PhotoInput';
import Button from '../Button/Button';
import Card from '../Card/Card';
import skeletonImage from '../../assets/sceleton.png';
import Error from '../Error/Errror';
import { loginUser, registerUser } from '../../actions';
import { saveTokens } from '../../jwt';


const RegistrationForm = ({authByToken}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [photo, setPhoto] = useState(skeletonImage);
    const [file, setFile] = useState('');

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
            }
            const dataString = JSON.stringify(data);
            const formData = new FormData();
            formData.append('photo', file);
            const response = await registerUser(dataString, formData);

            if (response.status === 201) {
                console.log(email, password);
                const loginResponse = await loginUser(email, password);
                console.log(loginResponse)
                if (loginResponse.status == 201) {
                    saveTokens(loginResponse.data.refresh, loginResponse.data.access);
                    authByToken();
                }
            }
        }
    };


    const handlePhotoChange = (newPhoto) => {
        setPhoto(newPhoto);
    };

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, password, repeatPassword])

    return (
        <div className="ctn">

            <Card maxWidth={500}>
                <h2 className="main-title">Регистрация</h2>
                <PhotoInput setFile={setFile} onPhotoChange={handlePhotoChange} />
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
                <Button colored={true} fullWidth={true} onClick={handleSubmit}>Зарегистрироваться</Button>
            </Card>
        </div>
    );
};

export default RegistrationForm;
