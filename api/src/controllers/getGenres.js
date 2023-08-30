const axios = require('axios');
const { Genres } = require('../db.js');

async function loadGenresToDB() {
  const response = await axios.get('https://api.rawg.io/api/genres', {
    params: {
      key: process.env.API_KEY,
    },
  });
  let apiGenresFormatted = []
  const apiGenres = response.data.results;
  apiGenres.forEach(genre => { //formateo los generos de la api para entregarlos 
    apiGenresFormatted.push({  //de la misma forma que en la db
      id: genre.id,
      name: genre.name,
    })
  });

  await Genres.bulkCreate(apiGenres);
}

loadGenresToDB()

const getGenres = async (req, res) => {
  try {
    
    const genresFromDB = await Genres.findAll();

    res.status(200).json(genresFromDB);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los géneros.' });
  }
};

module.exports = {
  getGenres,
};
