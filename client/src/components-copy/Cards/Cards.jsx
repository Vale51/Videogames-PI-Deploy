import React from 'react';
import Card from '../Card/Card.jsx';
import styles from './Cards.module.css';



export default function Cards({ isFilterOrderVisible, gamesToDisplay }) {
  


  return <>
    
    <div className={`${styles.container} ${isFilterOrderVisible ? styles.cardsShifted : styles.returnCards}`}>


      {gamesToDisplay?.map((game) =>

        <Card
          key={game.id}
          id={game.id}
          name={game.name}
          description={game.description}
          platforms={game.platforms}
          background_image={game.background_image}
          launchDate={game.launchDate}
          rating={game.rating}
          genres={game.genres}
          isDatabaseGame={game.isDatabaseGame}

        />)}


    </div>
  </>
}


