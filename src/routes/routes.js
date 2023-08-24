const express = require("express")
const router = express.Router();

const UserController = require("../app/controllers/UserController")
const MovieController = require("../app/controllers/MovieController");
const Favorite_movie = require("../app/controllers/Favorite_movieController")

const AdminAuth = require("../app/middlewares/AdminAuth");
const AuthToken = require("../app/middlewares/TokenJwtAuth");
const ValidationUser = require("../app/middlewares/ValidationUser");

//Users
router.get('/',  AuthToken, AdminAuth, UserController.index);
router.get('/user/:id?', AuthToken, AdminAuth, UserController.findUser);
router.post('/user', UserController.create);
router.delete('/user/:id?', AuthToken, ValidationUser, UserController.remove);
router.put('/user/:id?', AuthToken, ValidationUser, UserController.userUpdate);

// ajeitar tudo sobre os que tão
router.post('/recoverpassword', UserController.recoverpassword);
router.post("/changepassword", UserController.changePassword);
router.post('/login', UserController.login); // pronto

//Movies
router.get("/movies", MovieController.getAll);
router.get("/movie/:name?", MovieController.getMovie);
router.post("/movie", MovieController.create);
router.put("/movie/:id?", MovieController.update);
router.delete("/movie/:id?", MovieController.delete);

//Favorites Movies
router.get("/favoritesmovies", AuthToken, Favorite_movie.getAllMovieOfUser);
router.post("/favoritesmovies", AuthToken, Favorite_movie.create);
router.delete("/favoritesmovies/:id?", Favorite_movie.deleteFavoriteMovieOfUser)

module.exports = router;
