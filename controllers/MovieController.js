const User = require("../models/User");
const Movie = require("../models/Movie");
const { response } = require("express");

class MovieController {
    async getAll(req, res) {
        var response = await Movie.getAll();

        if (!response.status) {
            res.status(500);
            res.json({err: response.err});
            return;
        }

        if (response.data.length > 0) {
            res.status(200);
            res.json({movies: response.data});
        } else {
            res.status(404);
            res.json({err: "Not Found"});
        }
    }

    async getMovie(req, res) {
        var name = req.params.name;
        if(name == undefined || name == null) {
            res.status(400);
            res.json({err: "Id is not a number"});
        }

        var result = await Movie.findByName(name);
        if (!result.status) {
            res.status(500);
            res.json({err: result.err});
            return;
        }

        if (result.data.length > 0) {
            res.status(200);
            res.json({data: result.data});
        } else {
            res.status(404);
            res.json({err: "Not Found"});
        }
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

    async update(req, res) {
        var {title, details, sinopse, duration} = req.body;
        var id = req.params.id;
        var dataMovie = {};

        if (isNaN(id)) {
            res.status(401);
            res.json({err: "Id is not a number"});
            return;
        }

        var responseId = await Movie.findById(id);
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
        
        if (title != undefined) {
            dataMovie.title = title;
        }   
  
        if (details != undefined) {
            dataMovie.details = details;
        }

        if (sinopse != undefined) {
            dataMovie.sinopse = sinopse;
        }   
  
        if (duration != undefined) {
            dataMovie.duration = duration;
        }

        var responseUpdate = await Movie.update(dataMovie, id);
        if (!responseUpdate.status) {
            res.status(500);
            res.json({err: responseUpdate.err});
            return;
        } 

        res.status(200);
        res.json({response: "Success in updating"});
    }

    async delete(req, res) {
        var id = req.params.id;

        if (isNaN(id)) {
            res.status(401);
            res.json({err: "Id is not a number"});
            return;
        }

        var responseId = await Movie.findById(id);
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

        var responseDestroy = await Movie.destroy(id);
        if (!responseDestroy.status) {
            res.status(500);
            res.json({err: responseDestroy.err});
            return;
        }

        res.status(200);
        res.json({response: "Sucessfully deleted"})
    }
}

module.exports = new MovieController()