const express = require("express")
const router = express.Router();

const UserController = require("../controllers/UserController")
const MovieController = require("../controllers/MovieController");
const Favorite_movie = require("../controllers/Favorite_movieController")

const AdminAuth = require("../middlewares/AdminAuth");
const AuthToken = require("../middlewares/TokenJwtAuth");
const ValidationUser = require("../middlewares/ValidationUser");

//Users
router.get('/',  AuthToken, AdminAuth, UserController.index);
router.get('/user/:id?', AuthToken, AdminAuth, UserController.findUser);
router.post('/user', UserController.create);
router.delete('/user/:id?', AuthToken, ValidationUser, UserController.remove);
router.put('/user/:id?', AuthToken, ValidationUser, UserController.userUpdate);

// ajeitar tudo sobre os que tão
router.post('/recoverpassword', UserController.recoverpassword);
router.post("/changepassword/:id", UserController.changePassword);
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
