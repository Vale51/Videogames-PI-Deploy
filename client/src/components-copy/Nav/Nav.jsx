import SearchBar from "../SearchBar/SearchBar"
import styles from "./Nav.module.css"
import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const Nav = (props) => {
    const { currentPath } = props
    const [isFixed, setIsFixed] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    if (currentPath !== "/home") {
        return (
            <div className={`${styles.container} ${isFixed ? styles.fixed : ''}`}>

                {/* <Link className={styles.link} to="/about">
                    <button className={styles.btn}>
                        About
                    </button>
                </Link> */}
                <Link className={styles.link} to="/home">
                    <button className={styles.btn}>
                        Home
                    </button>
                </Link>
            </div>
        )
    }
    else {
        return (
            <div className={`${styles.container} ${isFixed ? styles.fixed : ''}`}>
                <Link className={styles.link} to="/home">
                    <button className={styles.btn}>
                        Home
                    </button>
                </Link>
                <Link className={styles.link} to="/form">
                    <button className={styles.btn}> Add Videogame </button>
                </Link>
                <SearchBar />

                

                {/* <Link className={styles.link} to="/about">
                    <button className={styles.btn}>
                        About
                    </button>
                </Link> */}
                
            </div>

        );
    }
}


export default Nav