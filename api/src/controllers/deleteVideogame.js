
const { Videogames } = require('../db.js');

const deleteVideogame = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRowsCount = await Videogames.destroy({
            where: {
                id: id
            }
        });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ message: 'No se encontró el videojuego con el ID proporcionado.' });
        }

        //const updatedVideogames = await Videogames.findAll();

        res.status(200).json(id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el videojuego.' });
    }
};


module.exports = {
    deleteVideogame
}