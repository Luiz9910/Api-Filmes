const express = require("express")
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController")

router.get('/', UserController.index)
router.post('/user', UserController.create);

module.exports = router;