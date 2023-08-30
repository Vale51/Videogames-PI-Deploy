import { ADD_GAME, ORDER_NAME, REMOVE_GAME, GET_GAMES, SEARCH_GAME, SEARCH_GAME_ERROR, GET_DETAIL, GET_GENRES, FILTER_GENRE, FILTER_ORIGIN, ORDER_RATING } from "./action-types"

const platformsArray = [
  "PlayStation 5",
  "Xbox Series X",
  "Nintendo Switch",
  "PC",
  "PlayStation 4",
  "Xbox One",
  "PlayStation 3",
  "Xbox 360",
  "Wii U",
  "Wii",
  "Nintendo 3DS",
  "PlayStation Vita",
  "Mobile",
  "VR",
  "Web"
];

const initialState = {
  games: [],
  gamesCopy: [],
  detail: null,
  error: null,
  platforms: platformsArray,
  genres: null
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        gamesCopy: payload
      }

    case ADD_GAME:
      return {
        ...state,
        games: state.games.concat(payload),
        gamesCopy: state.gamesCopy.concat(payload)
      }

    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      }

    case REMOVE_GAME:
      const updatedGames = state.games.filter(game => game.id !== payload);
      const updatedGamesCopy = state.gamesCopy.filter(game => game.id !== payload);


      return {
        ...state,
        games: updatedGames,
        gamesCopy: updatedGamesCopy,

      }

    case SEARCH_GAME:

      return {
        ...state,
        games: payload,
        error: null
      }

    case SEARCH_GAME_ERROR:
      return {
        ...state,
        error: payload,
      };

    case GET_DETAIL:

      return {
        ...state,
        detail: payload
      }

    case FILTER_GENRE:
      const filterGames = payload === "All" ? state.gamesCopy :
        state.gamesCopy.filter(game =>
          game.genres.some(genre => genre.name === payload)
        );

      return {
        ...state,
        games: filterGames,
      };

    case FILTER_ORIGIN:
      const filterGamesOrigin = payload === "All" ? state.gamesCopy :
        payload === "Database" ?
          state.gamesCopy.filter(game =>
            isNaN(game.id)
          ) :
          state.gamesCopy.filter(game =>
            !isNaN(game.id)
          )



      return {
        ...state,
        games: filterGamesOrigin,
        //filterGenre: payload  género filtrado en el estado
      };

    case ORDER_NAME:
      let copyOrderName = [...state.gamesCopy]
      return {
        ...state,
        games: payload === "Original" ? state.gamesCopy :
          payload === "Ascendente"
            ? copyOrderName.sort((a, b) => a.name.localeCompare(b.name))
            : copyOrderName.sort((a, b) => b.name.localeCompare(a.name))
      }

    case ORDER_RATING:
      let copyOrderRating = [...state.gamesCopy]
      return {
        ...state,
        games: payload === "Original" ? state.gamesCopy :
          payload === "Ascendente"
            ? copyOrderRating.sort((a, b) => a.rating - b.rating)
            : copyOrderRating.sort((a, b) => b.rating - a.rating)
      }

    default:
      return { ...state }
  }
};

export default rootReducer;
