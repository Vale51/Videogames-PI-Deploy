const axios = require('axios')
const URL = "https://api.rawg.io/api/games"

const { Videogames, Genres } = require('../db.js');

const getVideogames = async (req, res) => {
    try {
        let id
        if (req.params.idVideogame) {
            id = req.params.idVideogame

            if (isNaN(id)) {
                const videogameFromDB = await Videogames.findByPk(id, {
                    include: [{ model: Genres, as: 'genres', through: 'videogames_genres' }]
                });

                if (videogameFromDB) {
                    res.status(200).json(videogameFromDB)

                }
            }



            else {
                const videogameFromAPI = (await axios(URL + `/${id}?token&key=${process.env.API_KEY}`)).data
                res.status(200).json(videogameFromAPI)
            }
        }

        else {
            let videogames = [];

            const videogamesFromDB = await Videogames.findAll({
                include: [{ model: Genres, as: 'genres' }],
            });

            if (videogamesFromDB.length !== 0) {
                videogames.push(...videogamesFromDB)
            }

            let nextPage = URL + `?token&key=${process.env.API_KEY}`; //se declara next en la url inicial
            let i = 0
            
            while (videogames.length < 100) {

                const response = await axios.get(nextPage);
                const results = response.data.results;

                videogames.push(...results);

                nextPage = response.data.next;
                i++
            }


            res.status(200).json(videogames)

        }
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}



module.exports = {
    getVideogames
}