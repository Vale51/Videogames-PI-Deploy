const axios = require('axios')
const URL = "https://api.rawg.io/api/games"
const { Op } = require('sequelize')

const { Videogames, Genres } = require('../db.js');

const normalizeResults = (dbResults, apiResults) => {
    // Formatea los resultados de la base de datos a un formato común
    const normalizedDBResults = dbResults.map(result => ({
        id: result.id,
        name: result.name,
        background_image: result.background_image,
        genres: result.genres

    }));

    // Formatea los resultados de la API externa a un formato común
    const normalizedAPIResults = apiResults.map(result => ({
        id: result.id,
        name: result.name,
        background_image: result.background_image,

        genres: result.genres

    }));

    // Combina los resultados normalizados
    const combinedResults = normalizedDBResults.concat(normalizedAPIResults).slice(0, 15);

    return combinedResults;


};

const searchVideogamesByName = async (req, res) => {
    try {
        let query = '';
        if (req.query.search) {
            query = req.query.search.toLowerCase();

            const dbResults = await Videogames.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${query}%` 
                    }
                },
                include: [{ model: Genres, as: 'genres', through: 'videogames_genres' }],
                limit: 15
            });

            const apiResults = (await axios.get(URL + `?search=${query}&token&key=${process.env.API_KEY}`)).data.results;

            const normalizedResults = normalizeResults(dbResults, apiResults)

            if (normalizedResults.length === 0) {
                return res.status(404).json({ message: 'No se encontraron videojuegos con esa palabra clave.' });
            }
            res.status(200).json(normalizedResults);
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error en la búsqueda de videojuegos por nombre.' });
    }
};

module.exports = {
    searchVideogamesByName
}