import { ADD_GAME, ORDER_NAME, REMOVE_GAME, GET_GAMES, SEARCH_GAME, GET_DETAIL, GET_GENRES, SEARCH_GAME_ERROR, FILTER_GENRE, FILTER_ORIGIN, ORDER_RATING } from "./action-types"
import axios from 'axios'

export const addGame = (game) => {
   try {
      const endpoint = '/videogames';
      return async (dispatch) => {
         const { data } = await axios.post(endpoint, game)
         return dispatch({
            type: ADD_GAME,
            payload: data,
         });
      };
   }
   catch (error) {
      return { error: error.message }
   }
};




export const removeGame = (id) => {
   try {
      const endpoint = '/videogames/' + id;
      return async (dispatch) => {
         if (isNaN(id)) {
            await axios.delete(endpoint);
         }
         return dispatch({
            type: REMOVE_GAME,
            payload: id,
         });
      };
   }
   catch (error) {
      return { error: error.message }
   }

};

export const getVideogames = () => {
   try {
      const endpoint = '/videogames'
      return async (dispatch) => {
         const { data } = await axios.get(endpoint);
         return dispatch({
            type: GET_GAMES,
            payload: data,
         });
      };
   }
   catch (error) {
      return { error: error.message }
   }

};

export function searchGame(name) {
   return async (dispatch) => {
      try {
         const endpoint = `/videogames/name?search=${name}`;
         const response = await axios.get(endpoint);

         const searchResults = response.data;
         return dispatch({
            type: SEARCH_GAME,
            payload: searchResults,
         });

      } catch (error) {
         return dispatch({
            type: SEARCH_GAME_ERROR,
            payload: 'No games were found with that name.',
         });
      }
   };
}

export const getDetail = (id) => {
   try {
      const endpoint = `/videogames/${id}`
      return async (dispatch) => {
         const { data } = await axios.get(endpoint);
         return dispatch({
            type: GET_DETAIL,
            payload: data,
         });
      };
   }
   catch (error) {
      return { error: error.message }
   }

};

export function filterGenre(genre) {
   return {
      type: FILTER_GENRE,
      payload: genre
   }
}

export function filterOrigin(origin) {
   return {
      type: FILTER_ORIGIN,
      payload: origin
   }
}

export function orderName(orden) {
   return {
      type: ORDER_NAME,
      payload: orden
   }
}

export function orderRating(orden) {
   return {
      type: ORDER_RATING,
      payload: orden
   }
}

export function getGenres() {
   try {
      const endpoint = `/genres`
      return async (dispatch) => {
         const { data } = await axios.get(endpoint);
         return dispatch({
            type: GET_GENRES,
            payload: data,
         });
      };
   }
   catch (error) {
      return { error: error.message }
   }
}



