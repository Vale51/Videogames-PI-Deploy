import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderName, orderRating, filterGenre, filterOrigin, getGenres } from '../../redux/actions';
import styles from './FilterOrder.module.css';


const Home = ({ isFilterOrderVisible }) => {
    const dispatch = useDispatch();
    const genresList = useSelector(state => state.genres)



    useEffect(() => {
        dispatch(getGenres())
    }, []);

    const handleOrderName = (e) => {
        dispatch(orderName(e.target.value))
    }

    const handleOrderRating = (e) => {
        dispatch(orderRating(e.target.value))
    }

    const handleFilterGenre = (e) => {
        dispatch(filterGenre(e.target.value))
    }

    const handleFilterOrigin = (e) => {
        dispatch(filterOrigin(e.target.value))
    }

    return (


        <div className={`${styles.filterOrderContainer} ${isFilterOrderVisible ? styles.showFilterOrder : styles.hideFilterOrder}`}>
            <h3 className={styles.headerStyle}>
                    Order</h3>

            <select className={styles.selectStyle} onChange={handleOrderName} name="" id="">
                <option disabled value="" defaultValue>Order By Name</option>
                <option value="Original">Original</option>
                <option value="Ascendente">Ascending Name</option>
                <option value="Descendente">Descending Name</option>
            </select>

            <select className={styles.selectStyle} onChange={handleOrderRating} name="" id="">
                <option disabled value="" defaultValue>Order By Rating</option>
                <option value="Original">Original</option>
                <option value="Ascendente">Ascending Rating</option>
                <option value="Descendente">Descending Rating</option>
            </select>

            <h3 className={styles.headerStyle}> Filter </h3>
            
            <select className={styles.selectStyle} onChange={handleFilterGenre} name="" id="">
                <option disabled value="" defaultValue>Filter By Genre</option>
                {genresList?.map(genre => (
                    <option key={genre.id} value={genre.name}>
                        {genre.name}
                    </option>
                ))}
            </select>

            <select className={styles.selectStyle} onChange={handleFilterOrigin} name="" id="">
                <option disabled value="" defaultValue>Filter By Origin</option>
                <option value="All">All</option>
                <option value="Database">Database</option>
                <option value="API">API</option>
            </select>


        </div>


    )
}

export default Home