import React from 'react';
import styles from './About.module.css';
import { useState } from 'react';
function About() {
  const [english, setEnglish] = useState(false);

  const handleChange = (event) => {
    setEnglish(!english)
 }

  if(!english){
  return <>

    <button className={styles.btn} onClick={handleChange }> Switch to English</button>
      <div className={styles.container}>
        
        <h1 className={styles.title}>Valentin Risatti</h1>
        <h2 className={styles.subtitle}>/Proyecto-Rick-And-Morty</h2>
        <div className={styles.textContainer}>
          <h1 className={styles.header}>Sobre mí:</h1>
          <p className={styles.text}> Tengo 20 años y comencé a programar a los 15. Aprendí los fundamentos de la programación 
          en un concurso, que me dio la oportunidad de viajar a Silicon Valley, y visitar empresas como Facebook, Microsoft e Intel. 
          Estudié ingeniería en sistemas durante 2 años, pero decidí cambiar mi trayectoria para profundizar más en lo que era 
          realmente mi pasión, la programación. Ahora estoy en Henry, aprendiendo sobre desarrollo web y todas sus facetas; Front-End, 
          Back-End y Bases de Datos, al igual que Frameworks, como React, y tecnologías necesarias para el desarrollo en general, como Git y GitHub.

          </p>
        </div>
      </div>
    
    </>
  }
  else{
    return (


      <div className={styles.container}>
        <button className={styles.btn} onClick={handleChange }> Switch to Spanish</button>
        <h1 className={styles.title}>Valentin Risatti</h1>
        <h2 className={styles.subtitle}>/Rick-And-Morty-Project</h2>
        <div className={styles.textContainer}>
          <h1 className={styles.header}>About me:</h1>
          <p className={styles.text}> I am 20 years old and I started programming at the age of 15. 
          I learned the fundamentals of programming in a competition, which gave me the opportunity to travel to Silicon Valley and
           visit companies like Facebook, Microsoft, Intel. I studied systems engineering for 2 years, but I decided to change my path
            to delve deeper into what was truly my passion, programming. Now I am at Henry, learning about web development and all its 
            facets; Front-End, Back-End, and Databases, as well as frameworks like React, and necessary technologies for development in general,
             like Git and GitHub
          </p>
        </div>
      </div>
    );

  }
}

export default About;
