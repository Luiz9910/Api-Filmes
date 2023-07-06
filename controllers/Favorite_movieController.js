const FavoriteMovie = require("../models/Favorite_movie"); 
const Movie = require("../models/Movie"); 
const User = require("../models/User"); 

class Favorite_movieController {
    async create(req, res) {
        try {
            const {movie_id} = req.body;
            const user_id = req.user.id;

            const [responseUser, responseMovie] = await Promise.all([User.findById(user_id), Movie.findById(movie_id)]);

            if (!responseMovie.status) return res.status(500).json({err: responseMovie.err})
            if (!responseUser.status) return res.status(500).json({err: responseUser.err})

            if (
                (responseMovie.response == undefined || responseMovie.response.length == 0) ||
                (responseUser.response == undefined || responseUser.response.length == 0)
                ) {
                return res.status(404).json({err: 'User not found or Movie not found'});
            }
    
            const ResponseFavoriteMovie = await FavoriteMovie.new(user_id, movie_id);
            if (!ResponseFavoriteMovie.status) {
                return res.status(500).json({ err: ResponseFavoriteMovie.err});
            }
    
            res.status(201).send();
        } catch (err) {
            return res.status(500).json({ err: 'An error occurred.'});
        }
    }

    async getAllMovieOfUser(req, res) {
        try {
            const responseMovie = await FavoriteMovie.getAll(req.user.id);
            if (!responseMovie.status) {
                return res.status(500).json({err: response.err});
            }
    
            if (responseMovie.data.length == 0) {
                return res.status(204).send();
            }

            res.json({favorites: responseMovie.data});
        }catch (err) {
            return res.status(500).json({ err: 'An error occurred.'});
        }
    }

    async deleteFavoriteMovieOfUser(req, res) {
        try {
            const {id} = req.params

            if (isNaN(id)) {
                return res.status(400).json({err: "id is not a number"})
            }
    
            const resultFindMovieFavorite = await FavoriteMovie.getOne(id)
            if (!resultFindMovieFavorite.status) {
                return res.status(500).json({err: resultFindMovieFavorite.err})
            }

            if (resultFindMovieFavorite.result.length == 0 || resultFindMovieFavorite.result.length == undefined) {
                return res.status(404).json({err: "movie not exist"})
            }

            const responseDeleteFavoriteMovie = await FavoriteMovie.delete(id);
            if (!responseDeleteFavoriteMovie) {
                return res.status(500).json({err: responseDeleteFavoriteMovie.err})
            }
    
            res.status(204).send()
        } catch {
            return res.status(500).json({ err: 'An error occurred.'});
        }
    }
}

module.exports = new Favorite_movieController();