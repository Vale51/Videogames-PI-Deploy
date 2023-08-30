import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchGame } from '../../redux/actions';
import MagnifingGlassIcon from "../../img/MagnifingGlassIcon.png"

import styles from "./SearchBar.module.css";

const SearchBar = () => {
   const dispatch = useDispatch();
   const [name, setName] = useState('');

   const error = useSelector(state => state.error);

   const handleChange = (event) => {
      setName(event.target.value);
   }

   const handleSearch = async () => {
      try {
         await dispatch(searchGame(name));
      } catch (error) {
      }
      setName('');
   }

   const enter = (event) => {
      if (event.keyCode === 13) {
         handleSearch();
      }
   }

   return (
      <div className={styles.searchBarContainer}>
         <header className={styles.inputAndBtn} >

            <input
               className={styles.input}
               type='text'
               placeholder="Search Videogame..."
               value={name}
               onChange={handleChange}
               onKeyDown={enter}
            />
            <button className={styles.btn} onClick={handleSearch}>
               <img style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "5px",
                  filter: "invert(100%)"
               }}
                  src={MagnifingGlassIcon} alt="lupa" />
            </button>

         </header>
         {error && <p className={styles.error}>{error}</p>}

      </div>
   );
}

export default SearchBar;
