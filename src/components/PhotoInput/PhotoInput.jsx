import React, { useRef } from 'react';
import './PhotoInput.css';
import skeletonImage from '../../assets/sceleton.png';

const PhotoInput = ({ onPhotoChange, setFile}) => {
    
    const fileInputRef = useRef(null);
    const photoRef = useRef(null);

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(event.target.files[0])
            const reader = new FileReader();
            reader.onload = () => {
                if (photoRef.current) {
                    photoRef.current.src = reader.result;
                    onPhotoChange && onPhotoChange(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else {
            photoRef.current.src = skeletonImage;
        }
    };

    const openFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="photo-container" onClick={openFilePicker}>
            <img ref={photoRef} className="photo-preview" src={skeletonImage} alt="Фото профиля" />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
                accept="image/png, image/jpeg"
            />
            <p className="main-text">Фото профиля (не обязательно)</p>
        </div>
    );
};

export default PhotoInput;
