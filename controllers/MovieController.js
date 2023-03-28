const User = require("../models/User");
const Movie = require("../models/Movie");

class Movie {
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

        var resultSaveFilme = await Movie.create(title, details, sinopse, duration);

        if (!resultSaveFilme.status) {
            res.status(500);
            res.json({err: "error in saving movie"});
        }

        res.send("All right")
    }
}