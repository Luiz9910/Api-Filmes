const User = require("../models/User");

class UserController {
    async index(req, res) {
        res.send("opa")
    }

    async create(req, res) {
        var {name, email, password} = req.body;

        
    }
}

module.exports = new UserController();