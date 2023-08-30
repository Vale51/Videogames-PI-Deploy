const { Router } = require('express');

const {getVideogames} = require('../controllers/getVideogames')
const {infoApi} = require('../controllers/getVideogames')

const {searchVideogamesByName} = require('../controllers/searchVideogamesByName')
const {postVideogame} = require('../controllers/postVideogame')
const {deleteVideogame} = require('../controllers/deleteVideogame')

const {getGenres} = require('../controllers/getGenres')



const router = Router();


router.get('/videogames', getVideogames);
router.get('/videogames/name', searchVideogamesByName);
router.get('/videogames/:idVideogame', getVideogames);
router.post('/videogames', postVideogame)
router.delete('/videogames/:id', deleteVideogame)

router.get('/genres', getGenres);





module.exports = router;
