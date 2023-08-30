import { useDispatch, useSelector } from 'react-redux';

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Detail.module.css";
import { getDetail } from '../../redux/actions';

function Detail() {
  const dispatch = useDispatch();
  const detail = useSelector(state => state.detail)

  const { id } = useParams();
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  useEffect(() => {

    dispatch(getDetail(id))

  }, []);

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  return (
    <>
      {detail?.platforms ? (
        <>
          <div className={`${styles.container} ${isDescriptionOpen ? styles.moveCard : styles.returnCard}`}>

              <div className={`${styles.card}`}>
                <h3 className={styles.id}>{detail.id}</h3>
                <div className={styles.imageContainer}>
                  <img className={styles.image} src={detail.background_image} alt="" />
                </div>
                <div className={styles.nameAndDate}>
                  <p className={styles.name}>Title: <br />{detail.name}</p>
                  <p className={styles.name}>Release Date:<br />{detail.released}</p>
                  <p className={styles.name}>Rating:<br />{detail.rating}</p>
                  <p className={styles.platforms}>Platforms:<br />{detail.platforms ? detail.platforms.map(element => element.platform ? element.platform.name : element).join(', ') : 'Loading...'}</p>
                  <p>Genres:<br />{detail.genres?.map(genre => genre.name).join(', ')}</p>
                </div>
              </div>



            
              <div className={`${styles.description}`}>
                <h3> Description:</h3>
                <p>{detail.description_raw ? detail.description_raw : detail.description}</p>
              </div>


          </div>
          <button
            className={styles.descriptionButton}
            onClick={toggleDescription}
          >
            {isDescriptionOpen ? "Go back" : "Read Description"}
          </button>
        </>
      ) : (<div className={styles.loadingText}>
        <h1>Loading...</h1>

      </div>)
      }
    </>
  );
}

export default Detail;
