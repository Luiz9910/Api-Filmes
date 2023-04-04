const express = require("express")
const router = express.Router();
const UserController = require("../controllers/UserController")
const MovieController = require("../controllers/MovieController");
var AdminAuth = require("../middleware/AdminAuth");

router.get('/', AdminAuth, UserController.index);
router.get('/user/:id', AdminAuth, UserController.findUser);
router.post('/user', UserController.create);
router.delete('/user/:id', AdminAuth, UserController.remove);
router.put('/user/:id', AdminAuth, UserController.userUpdate);
router.post('/recoverpassword', UserController.recoverpassword);
router.post("/changepassword/:id", UserController.changePassword);
router.post('/login', UserController.login);
router.post('/movie', MovieController.create)

module.exports = router;