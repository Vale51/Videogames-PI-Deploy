import React, { useState, useEffect } from 'react';
import { addGame, getGenres } from '../../redux/actions';
import { connect } from 'react-redux';
import { validateForm } from '../Validation/validation.js';
import { useDispatch, useSelector } from 'react-redux';

import styles from "./Form.module.css"

export function Form({ addGame }) {
    const dispatch = useDispatch();
    const genresList = useSelector(state => state.genres)
    const platformsList = useSelector(state => state.platforms)
    const games = useSelector(state => state.games)

    const [gameCreated, setGameCreated] = useState(false);
    const [gameCreatedFadeOut, setGameCreatedFadeOut] = useState(false);





    const [errors, setErrors] = useState({});

    const [game, setGame] = useState({
        name: "",
        description: "",
        background_image: "",
        platforms: [],
        released: "",
        rating: "",
        genres: [],
    });

    useEffect(() => {
        dispatch(getGenres())
    }, []);



    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("");

    const handleAddPlatform = () => {
        if (selectedPlatform === "") {
            setErrors({
                ...errors,
                platforms: "Please select a Platform"
            });
        }
        else if (game.platforms.includes(selectedPlatform)) {

        }

        else {

            delete errors.platforms
            setGame({
                ...game,
                platforms: [...game.platforms, selectedPlatform]
            });
            setSelectedPlatform("");
        }

    };

    function handleDeletePlatform(platformToDelete) {
        console.log(platformToDelete);

        setGame({
            ...game,
            platforms: game.platforms.filter((platform) => platform !== platformToDelete),
        });
    }



    const handleAddGenre = () => {
        if (selectedGenre === "") {
            setErrors({
                ...errors,
                genres: "Please select a Genre"
            });
        } else if (game.genres.includes(selectedGenre)) {

        } else {

            delete errors.genres

            setGame({
                ...game,
                genres: [...game.genres, selectedGenre]
            });

            setSelectedGenre("");
        }

    };


    function handleDeleteGenre(genreToDelete) {
        console.log(genreToDelete);
        setGame({
            ...game,
            genres: game.genres.filter((genre) => genre !== genreToDelete),
        });
    }


    const handleChange = e => {

        const { name, value } = e.target;

        const newValue = (name === 'genres' || name === 'platforms') ? value.split(',').map(element => element.trim()) : value;

        setGame({
            ...game,
            [e.target.name]: newValue
        });
        setErrors(validateForm({
            ...game,
            [e.target.name]: newValue
        }, games))
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm(game);

        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            try {
                addGame(game);
                setGameCreated(true);
                setTimeout(() => {
                    setGameCreatedFadeOut(true);
                    setTimeout(() => {
                        setGameCreated(false);
                        setGameCreatedFadeOut(false);
                    }, 1000); // Espera 1 segundo para restablecer gameCreatedFadeOut
                }, 5000);
            } catch (error) {
                alert(error);
            }

        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <form className={styles.formContainer}>
                    <div className={styles.formColumn}>
                        <div className={styles.inputContainer}>
                            <h3>Name:</h3>
                            <input
                                className={styles.inputField}
                                type="text"
                                name="name"
                                value={game.name}
                                onChange={e => handleChange(e)}
                            />
                            {<p className={`${errors.name ? styles.errorMessage : styles.errorInvisible}`}>{errors.name}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <h3>Description:</h3>
                            <input
                                className={styles.inputField}
                                type="text"
                                name="description"
                                value={game.description}
                                onChange={e => handleChange(e)}
                            />
                            {<p className={`${errors.description ? styles.errorMessage : styles.errorInvisible}`}>{errors.description}</p>}

                        </div>

                        <div className={styles.inputContainer}>
                            <h3>Image:</h3>
                            <input
                                className={styles.inputField}
                                type="text"
                                name="background_image"
                                value={game.background_image}
                                onChange={e => handleChange(e)}
                            />
                            {<p className={`${errors.background_image ? styles.errorMessage : styles.errorInvisible}`}>{errors.background_image}</p>}

                        </div>


                        <div className={styles.inputContainer}>
                            <h3>Platforms:</h3>
                            <select

                                className={styles.inputField}
                                type="text"
                                name="selectedPlatform"
                                value={selectedPlatform}

                                onChange={e => setSelectedPlatform(e.target.value)}
                            >
                                <option value="" disabled>Select a Platform:</option>
                                {platformsList?.map((platform, index) => (
                                    <option key={index} value={platform}>
                                        {platform}
                                    </option>
                                ))}
                            </select>
                            <button className={styles.addGenreButton} type="button" onClick={handleAddPlatform}>Add Platform</button>

                            {<p className={`${errors.platforms ? styles.errorMessage : styles.errorInvisible}`}>{errors.platforms}</p>}


                        </div>
                        <div className={styles.platformsContainer}>
                            <h3 className={styles.AddedPlatformsText}>Added Platforms:</h3>

                            <div className={styles.addedGenres}>
                                <div className={styles.genresList}>
                                    {game.platforms.map((platform, index) => (
                                        <div key={index} className={styles.genreItem}>{platform}
                                            <button className={styles.deleteGenreBtn} type="button" onClick={() => handleDeletePlatform(platform)}>
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className={styles.formColumn}>
                        <div className={styles.inputContainer}>
                            <h3>Released:</h3>
                            <input
                                className={styles.inputField}
                                type="text"
                                name="released"
                                value={game.released}
                                onChange={e => handleChange(e)}
                            />
                            {<p className={`${errors.released ? styles.errorMessage : styles.errorInvisible}`}>{errors.released}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <h3>Rating:</h3>
                            <input
                                className={styles.inputField}
                                type="text"
                                name="rating"
                                value={game.rating}
                                onChange={e => handleChange(e)}
                            />
                            {<p className={`${errors.rating ? styles.errorMessage : styles.errorInvisible}`}>{errors.rating}</p>}

                        </div>
                        <div className={styles.inputContainer}>
                            <h3>Genres:</h3>
                            <select
                                className={styles.inputField}
                                name="selectedGenre"
                                value={selectedGenre}
                                onChange={e => setSelectedGenre(e.target.value)}
                            >
                                <option value="" disabled>Select a genre</option>
                                {genresList?.map(genre => (
                                    <option key={genre.id} value={genre.name}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                            {<p className={`${errors.genres ? styles.errorMessage : styles.errorInvisible}`}>{errors.genres}</p>}


                        </div>
                        <div className={styles.inputContainer}>
                            <button className={styles.addGenreButton} type="button" onClick={handleAddGenre}>Add Genre</button>
                            <h3 >Added Genres:</h3>

                            <div className={styles.addedGenres}>
                                <div className={styles.genresList}>
                                    {game.genres.map((genre, index) => (
                                        <div key={index} className={styles.genreItem}>{genre}
                                            <button className={styles.deleteGenreBtn} type="button" onClick={() => handleDeleteGenre(genre)}>
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <button onClick={handleSubmit} className={styles.submitButton} disabled={Object.keys(errors).length !== 0} type="submit">Submit</button>

            </div>
            {gameCreated ? (
                <h3 className={`${styles.gameCreatedMessage} ${gameCreatedFadeOut ? styles.fadeOut : ''}`}>
                    Game created successfully!
                </h3>
            ) : null}
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addGame: (game) => dispatch(addGame(game))

    };
};

export default connect(null, mapDispatchToProps)(Form);
