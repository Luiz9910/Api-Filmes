const Movie = require("../models/Movie");
const validateContentBodyCreate = require("../factory/validationContentBodyCreate");
const validateContentBodyUpdate = require("../factory/validationContentBodyUpdate");

class MovieController {
    async getAll(req, res) {
        try {
            const response = await Movie.getAll();
            if (!response.status) {
                return res.status(500).json({err: response.err});
            }

            if (response.data.length > 0) {
                return res.status(200).json({movies: response.data});
            }

            res.status(204).send();
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
        }
    }

    async getMovie(req, res) {
        try {
            const name = req.params.name;
            const result = await Movie.findByName(name);

            if (!result.status) {
                return res.status(500).json({err: result.err});
            }

            if (result.data.length <= 0) {
                return res.status(204).json({err: "No content"});
            }

            res.status(200).json({movies: result.data});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
        }
    }

    async create(req, res) {
        try {
            let {title, details, sinopse, duration, year, classification, cover} = req.body;

            const contentBody = {title, details, sinopse, duration, year, classification, cover};
            const invalidFields = validateContentBodyCreate(contentBody);
            if (Object.keys(invalidFields).length > 0) {
                return res.status(400).json({ err: invalidFields });
            }

            year = year.replace(/\//g, '-');
            year = new Date(year).getFullYear();

            let resultSaveFilme = await Movie.new(title, details, sinopse, duration, year, classification, cover);
            if (!resultSaveFilme.status) {
                return res.status(500).json({err: resultSaveFilme.err});
            }

            res.status(201).json({result: "Successfully saved movie"});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.'});
        }
    }

    async update(req, res) {
        try {
            let {title, details, sinopse, duration, year, classification, cover} = req.body;
            const id = req.params.id;

            if (isNaN(id)) {
                return res.status(400).json({err: "Id is not a number"});
            }

            const responseId = await Movie.findById(id);
            if(!responseId.status) {
                return res.status(500).json({err: responseId.err});
            }

            if (responseId.response.length <= 0) {
                return res.status(404).json({err: "Movie not found to update"});
            }

            if (year != undefined || year > 0) {
                year = year.replace(/\//g, '-');
                year = new Date(year).getFullYear();
            }

            const contentBody = {title, details, sinopse, duration, year, classification, cover};
            const dataMovie = validateContentBodyUpdate(contentBody);
            if (Object.keys(dataMovie).length <= 0) {
                return res.status(204).send();
            }

            let responseUpdate = await Movie.update(dataMovie, id);
            if (!responseUpdate.status) {
                return res.status(500).json({err: responseUpdate.err});
            }

            res.status(200).json({response: "Success in updating"});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.'});
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            if (isNaN(id)) {
                return res.status(400).json({err: "Id is not a number"});
            }

            const responseId = await Movie.findById(id);
            if(!responseId.status) {
                return res.status(500).json({err: responseId.err});
            }

            if (responseId.response.length <= 0) {
                return res.status(404).json({err: "Movie not found"});
            }

            let responseDestroy = await Movie.destroy(id);
            if (!responseDestroy.status) {
                return res.status(500).json({err: responseDestroy.err});
            }

            res.status(200).json({response: "Sucessfully deleted"});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
        }
    }
}

module.exports = new MovieController()
