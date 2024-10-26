import React from 'react';
import './Footer.css';

const Footer = ({ }) => {
    return (
        <footer className="footer">
            <div className="ctn footer_ctn">
                <div className="footer-column-wrapper">
                    <div className="footer-column">
                        <h2 className="main-title footer-title">Наши гитхабы</h2>
                        <a href="https://github.com/inpanica" className='main-link' target="_blank" rel="noopener noreferrer">github.com/inpanica</a>
                        <a href="https://github.com/aleks9045" className='main-link' target="_blank" rel="noopener noreferrer">github.com/aleks9045</a>
                        <a href="https://github.com/Shuv1Wolf" className='main-link' target="_blank" rel="noopener noreferrer">github.com/Shuv1Wolf</a>
                    </div>
                    <div className="footer-column">
                        <h2 className="main-title footer-title">Мы в telegram</h2>
                        <a href="https://t.me/mem0ry_1" className='main-link' target="_blank" rel="noopener noreferrer">@mem0ry_1</a>
                        <a href="https://t.me/aleks_9045" className='main-link' target="_blank" rel="noopener noreferrer">@aleks_9045</a>
                        <a href="https://t.me/Shuv1_Wolf" className='main-link' target="_blank" rel="noopener noreferrer">@Shuv1_Wolf</a>
                    </div>
                    <div className="footer-column">
                        <h2 className="main-title footer-title">Оджетто</h2>
                        <a href="https://oggetto.ru/" className='main-link' target="_blank" rel="noopener noreferrer">oggetto.ru</a>
                        <a href="https://oggetto.team/#/index" className='main-link' target="_blank" rel="noopener noreferrer">oggetto.team</a>
                    </div>
                </div>
                <p className="main-desc copyr">&copy; 2024 Все права защищены.</p>
            </div>
        </footer>



    );
};

export default Footer;
