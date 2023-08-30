import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import background from '../../img/LandingBackground.jpg'

const Landing = () => {
    const text = "Videogames API Fullstack Project"; // Texto a escribir
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        if (currentIndex < text.length) {
            setTimeout(() => {
                setDisplayText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 70); 
        }
        
    }, [currentIndex, text]);

    

    return (
        
            <div className={styles.landingContainer}>
                <h1 className={styles.landingText} data-text-length={text.length}>
                    {displayText}
                </h1>
                    <Link to="/home" className={styles.landingButton}>
                       Continue
                        
                    </Link>
            </div>
        
    
    );
}

export default Landing;
