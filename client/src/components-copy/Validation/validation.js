export const validateForm = (game, gamesState) => {
    const errors = {};
    const regex = /^[A-Za-z\s-]+$/;

    // const repeatedGame = gamesState.some(element => game.name === element.name)

    regex.test(game.name);

    if (repeatedGame) {
        errors.name = "That name has been already taken.";
    }

    if (!game.name) {
        errors.name = "The 'name' field is required.";
    }
    else if (!regex.test(game.name)) {
        errors.name = "The 'name' field should only have letters.";

    }
    if (!game.background_image) {
        errors.background_image = "The 'Image' field is required.";
    }

    if (!game.description) {
        errors.description = "The 'description' field is required.";
    }

    if (!game.platforms.length) {
        errors.platforms = "You must select at least one platform.";
    }

    if (!game.released) {
        errors.released = "The 'released' field is required.";
    } else {
        const currentDate = new Date();
        const enteredDate = new Date(game.released);

        if (isNaN(enteredDate) || enteredDate > currentDate) {
            errors.released = "The release date must be valid and cannot be in the future.";
        }
    }

    if (!game.rating) {
        errors.rating = "The 'rating' field is required.";
    } else if (!/^[0-9]+(\.[0-9]+)?$/.test(game.rating) || parseFloat(game.rating) < 1 || parseFloat(game.rating) > 5) {
        errors.rating = "The 'rating' field must be a number between 1 and 5.";
    }

    if (game.genres.length === 0) {
        errors.genres = "You must add at least one genre.";
    }


    return errors;
};
