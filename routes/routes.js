const express = require("express")
const router = express.Router();
const UserController = require("../controllers/UserController")
const MovieController = require("../controllers/MovieController");
const AdminAuth = require("../middleware/AdminAuth");
const AuthToken = require("../middleware/TokenJwtAuth");
const ValidationUser = require("../middleware/ValidationUser");

//Users
router.get('/',  AuthToken, AdminAuth, UserController.index);
router.get('/user/:id', AuthToken, AdminAuth, UserController.findUser);
router.post('/user', UserController.create);
router.delete('/user/:id', AuthToken, ValidationUser, UserController.remove);
router.put('/user/:id', AuthToken, ValidationUser, UserController.userUpdate);
router.post('/recoverpassword', UserController.recoverpassword);
router.post("/changepassword/:id", UserController.changePassword);
router.post('/login', UserController.login);

//Movies
router.get("/movies", MovieController.getAll);
router.get("/movie/:name", MovieController.getMovie);
router.post("/movie", MovieController.create);
router.put("/movie/:id", MovieController.update);
router.delete("/movie/:id", MovieController.delete);

module.exports = router;