import React, { useState } from 'react';
import Card from '../Card/Card';
import Checkbox from '../CheckBox/CheckBox';
import './Personal.css';
import { config } from '../../config';

const Personal = ({ user, setUser }) => {

    return (
        <div className="ctn">
            <Card maxWidth={500}>
                <h2 className="main-title">Активные цели</h2>
                <div className="personal-wrapper">
                    <Checkbox>Спорт</Checkbox>
                    <Checkbox>Кулинария</Checkbox>
                    <Checkbox>Музыка</Checkbox>
                    <Checkbox>Рисование</Checkbox>
                    <Checkbox>Кино</Checkbox>
                    <Checkbox>Животные</Checkbox>
                    <Checkbox>Технологии</Checkbox>
                    <Checkbox>Общение</Checkbox>
                    <Checkbox>Игры</Checkbox>
                    <Checkbox>Литература</Checkbox>
                </div>
            </Card>
            <Card maxWidth={500}>
                <h2 className="main-title">Личные достижения</h2>
            </Card>
        </div>
    );
};

export default Personal;
