import React from 'react';
import "./HeroImage.css"
import { unavailable } from '../Config/config';

const HeroImage = ({image, title, text}) => (
    <div className='Wrapper'>
        <img className='heroImage'
            src={
                image 
                    ? image
                    : unavailable
            } 
            alt ={title} 
        />
        <div className='info'>
        <h1 className='heroImageTitle'>{title}</h1>
        <span className='desc'>{text}</span>
        </div>

    </div>

);

export default HeroImage; 