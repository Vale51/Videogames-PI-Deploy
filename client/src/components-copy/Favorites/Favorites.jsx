import React from 'react';
import { connect } from 'react-redux';
import Cards from '../Cards/Cards'; //uso el componente Cards para renderizar al estado myFavorites
import { useDispatch } from 'react-redux';
import { order,filter } from '../../redux/actions';


import style from "./Favorites.module.css"

export function Favorites({ myFavorites, onClose, characters }) {
  
  
  const dispatch = useDispatch()

  const existingFavCharacters = [];

  myFavorites.forEach((favChar)=>{
    characters.forEach((char)=>{
      if (char.id === favChar.id) {
        existingFavCharacters.push(favChar); //este array va a contener los personajes favoritos que tambien existen en el estado characters
      }
    })
  })

  const handleOrder = (e)=>{
    dispatch(order(e.target.value))
  }

  const handleFilter = (e)=>{
    dispatch(filter(e.target.value))
  }
  
  return (
    <>
      <h1 className={style.title}>Your favorite Characters</h1>
      <div>
        <select className={style.option} onChange={handleOrder} name="" id="">
        
          <option value="Ascendente">Ascending</option>
          <option value="Descendente">Descending</option>
        </select>
        
        <select className={style.option}  onChange={handleFilter} name="" id="">
        <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="unknown">Unknown</option>
          <option value="genderless">Genderless</option>
          
        </select>

      </div>
      
      <Cards characters={existingFavCharacters} onClose={onClose} />
      
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};


export default connect(mapStateToProps)(Favorites);
