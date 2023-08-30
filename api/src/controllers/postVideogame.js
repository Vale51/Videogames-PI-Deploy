const { Op } = require('sequelize')

const {Videogames, Genres} = require('../db.js');

const postVideogame = async (req, res) => {
    try {
        const { name, description, platforms, background_image, released, rating, genres } = req.body;

        

        let newVideogame = await Videogames.create({
          name,
          description,
          platforms,
          background_image,
          released,
          rating,
        });
    

       if (genres && genres.length > 0) {
         const foundGenres = await Genres.findAll({
           where: {
             name: {
               [Op.in]: genres,
             },
           },
         });
          await newVideogame.addGenres(foundGenres);

          let response = {
            ...newVideogame.dataValues,
            genres : genres
          }
  
  
          res.status(201).json(response);
        }
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el videojuego' });
      }
};

module.exports = {
    postVideogame
}