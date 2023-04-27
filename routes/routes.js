const express = require("express")
const router = express.Router();
const UserController = require("../controllers/UserController")
const MovieController = require("../controllers/MovieController");
var AdminAuth = require("../middleware/AdminAuth");
const Movie = require("../models/Movie");

//Users
router.get('/', AdminAuth, UserController.index);
router.get('/user/:id', AdminAuth, UserController.findUser);
router.post('/user', UserController.create);
router.delete('/user/:id', AdminAuth, UserController.remove);
router.put('/user/:id', AdminAuth, UserController.userUpdate);
router.post('/recoverpassword', UserController.recoverpassword);
router.post("/changepassword/:id", UserController.changePassword);
router.post('/login', UserController.login);

//Movies
router.get("/movies", MovieController.getAll);
router.get("/movie/:name", MovieController.getMovie);
router.post("/movie", MovieController.create);
router.put("/movie/:id", MovieController.update)

module.exports = router;