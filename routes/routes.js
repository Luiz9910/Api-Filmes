const express = require("express")
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController")

router.get('/', UserController.index);
router.get('/user/:id', UserController.findUser);
router.post('/user', UserController.create);
router.delete('/user/:id', UserController.remove);
router.put('/user/:id', UserController.userUpdate);

module.exports = router;