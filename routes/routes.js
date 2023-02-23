const express = require("express")
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController")

router.get('/', UserController.index)

module.exports = router;