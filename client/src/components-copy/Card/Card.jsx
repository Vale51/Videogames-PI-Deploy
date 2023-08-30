import React, { useState, useEffect } from 'react';
import notFoundImg from "../../img/img-not-found.jpg"
import { removeGame } from '../../redux/actions';
import { connect } from 'react-redux';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export function Card({
  id,
  name,
  background_image,
  genres,
  removeGame,
}) {



  const [removeCard, setRemoveCard] = useState(false);
  const [sizeChange, setsizeChange] = useState(false);

  const handleClose = () => {
    setRemoveCard(true);
    setTimeout(() => {
      removeGame(id)
    }, 500);
  };

  return (
    <div className={`${styles.card} ${removeCard ? styles.exitAnim : ''}`}>
      <div className={styles.cardContent}>


        <button className={styles.closeButton} onClick={handleClose}>
          X
        </button>

        <Link className={styles.anchorStyle} to={`/detail/${id}`}>
          <h2 className={styles.name}>{name}</h2>
        </Link>

        <img className={styles.image} src={background_image ? background_image : notFoundImg} alt="imagen" />

        <div className={styles.desc}>
          {genres && genres.length > 0 && (
            <p>Genres: {genres.map(genre => {
              if (genre.name) {
                return genre.name
              }
              else {
                return genre

              }
            }).join(', ')}</p>
          )}
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeGame: (id) => dispatch(removeGame(id))
  };
};

export default connect(null, mapDispatchToProps)(Card);
