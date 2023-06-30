const Movie = require("../models/Movie");

class MovieController {
    async getAll(req, res) {
        let response = await Movie.getAll();

        if (!response.status) {
            res.status(500);
            res.json({err: response.err});
            return;
        }

        if (response.data.length > 0) {
            res.status(200);
            res.json({movies: response.data});
            return;
        }

        res.status(204).send();
    }

    async getMovie(req, res) {
        let name = req.params.name;

        let result = await Movie.findByName(name);
        if (!result.status) {
            res.status(500);
            res.json({err: result.err});
            return;
        }

        if (result.data.length <= 0) {
            res.status(204);
            res.json({err: "No content"});
            return;
        }

        res.status(200);
        res.json({data: result.data});
    }

    async create(req, res) {
        let {title, details, sinopse, duration, year, classification, cover} = req.body;

        const contentsBody = ["title", "details", "sinopse", "duration", "year", "classification", "cover"];
        const arrayContent = [title, details, sinopse, duration, year, classification, cover];
        for (let cont of arrayContent) {
            for (let contentBody of contentsBody) {
                if (cont == undefined || cont.length == 0) {
                    res.status(406);
                    res.json({err: `Invalid ${contentBody}`});
                    return
                }
            }
        }
        
        year = year.replace(/\//g, '-');
        year = new Date(year).getFullYear();

        let resultSaveFilme = await Movie.new(title, details, sinopse, duration, year, classification, cover);
        if (!resultSaveFilme.status) {
            res.status(500);
            res.json({err: resultSaveFilme.err});
            return;
        }

        res.status(201);
        res.json({result: "Successfully saved movie"});
    }

    async update(req, res) {
        let {title, details, sinopse, duration, year, classification, cover} = req.body;
        let dataMovie = {};
        const id = req.params.id;

        if (isNaN(id)) {
            res.status(400);
            res.json({err: "Id is not a number"});
            return;
        }

        let responseId = await Movie.findById(id);
        if(!responseId.status) {
            res.status(500);
            res.json({err: responseId.err});
            return;
        } 

        if (responseId.response.length <= 0) {
            res.status(404);
            res.json({err: "Movie not found to update"});
            return;
        }
        
        let contentBody = ["title", "details", "sinopse", "duration", "year", "classification", "cover"];
        const arrayContent = [title, details, sinopse, duration, year, classification, cover];
        arrayContent.forEach((content, index) => {
            if (content != undefined && content.length > 0) {
                dataMovie[contentBody[index]] = content;
            }
        })

        let responseUpdate = await Movie.update(dataMovie, id);
        if (!responseUpdate.status) {
            res.status(500);
            res.json({err: responseUpdate.err});
            return;
        } 

        res.status(200);
        res.json({response: "Success in updating"});
    }

    async delete(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.status(400);
            res.json({err: "Id is not a number"});
            return;
        }

        let responseId = await Movie.findById(id);
        if(!responseId.status) {
            res.status(500);
            res.json({err: responseId.err});
            return;
        } 

        if (responseId.response.length <= 0) {
            res.status(404);
            res.json({err: "Movie not found"});
            return;
        }

        let responseDestroy = await Movie.destroy(id);
        if (!responseDestroy.status) {
            res.status(500);
            res.json({err: responseDestroy.err});
            return;
        }

        res.status(200);
        res.json({response: "Sucessfully deleted"});
    }
}

module.exports = new MovieController()