import Cards from "../Cards/Cards";
import FilterOrder from "../FilterOrder/FilterOrder"
import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import { useSelector } from 'react-redux/es/hooks/useSelector.js';
import Pagination from '../Pagination/Pagination';

const ITEMS_PER_PAGE = 15;


const Home = () => {
    const dispatch = useDispatch();
    const [isFilterOrderVisible, setIsFilterOrderVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadingText = "Loading";
    const dots = "...";
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const games = useSelector(state => state.games)

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const gamesToDisplay = games.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex === dots.length) {
                setDisplayText(loadingText);
                setCurrentIndex(0);
            } else {
                setDisplayText(loadingText + dots.slice(0, currentIndex + 1));
                setCurrentIndex(prevIndex => prevIndex + 1);
            }
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [currentIndex]);

    useEffect(() => {
        dispatch(getVideogames());

        setTimeout(() => {
            setIsLoading(false)
        }, 6000);
    }, []);

    const toggleFilterOrder = () => {
        setIsFilterOrderVisible(!isFilterOrderVisible); // Cambia el estado al hacer clic en el botón
    };



    return (
        <div className={styles.container}>
            {isLoading ? (
                <div className={styles.loadingContainer}>
                    <h1 className={styles.loadingText}>{displayText}</h1>
                    <div className={styles.progressBarContainer}>
                        <div className={`${styles.progressBarEmpty} ${styles.progressBarFull}`}></div>
                    </div>
                </div>
            ) : (
                <div className={styles.mainDiv}>
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={ITEMS_PER_PAGE}
                        totalItems={games.length}
                        onPageChange={handlePageChange}
                    />

                    <div className={`${styles.homeContainer} ${isFilterOrderVisible ? styles.shiftAll : styles.unshiftAll}`}>
                        <button className={`${styles.button} ${isFilterOrderVisible ? styles.moveButton : styles.returnButton}`} onClick={toggleFilterOrder}>Filters</button>
                        <div className={styles.contentContainer}>
                            {<FilterOrder isFilterOrderVisible={isFilterOrderVisible} />}
                            <Cards isFilterOrderVisible={isFilterOrderVisible} gamesToDisplay={gamesToDisplay}/>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Home