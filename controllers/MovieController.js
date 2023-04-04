const User = require("../models/User");
const Movie = require("../models/Movie");

class MovieController {
    async getAll(req, res) {

    }

    async create(req, res) {
        let {title, details, sinopse, duration} = req.body;

        if (title == undefined) {
            res.status(406);
            res.json({err: "Invalid title"});
            return;
        }

        if (details == undefined) {
            res.status(406);
            res.json({err: "Invalid name"});
            return;
        }

        if (sinopse == undefined) {
            res.status(406);
            res.json({err: "Invalid name"});
            return;
        }

        if (duration == undefined) {
            res.status(406);
            res.json({err: "Invalid name"});
            return;
        }

        var resultSaveFilme = await Movie.new(title, details, sinopse, duration);

        if (!resultSaveFilme.status) {
            res.status(500);
            res.json({err: resultSaveFilme.err});
            return;
        }

        res.status(201);
        res.json({result: "Successfully saved movie"});
    }
}

module.exports = new MovieController();