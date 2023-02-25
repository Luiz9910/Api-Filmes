const User = require("../models/User");

class UserController {
    async index(req, res) {
        var response = await User.index();

        if (response.status) {

            var data = response.data;
            if (data.length > 0) {
                res.status(200);
                res.send(data);
            } else {
                res.status(404);
                res.json({err: "Not found"});
            }

        } else {
            res.status(406);
            res.json({err: response.err});
        }
    }

    async findUser(req, res) {
        var id = req.params.id;
        if (!isNaN(id)) {

            var result = await User.findById(id);
            if (result.length > 0) {
                res.status(200);
                res.send(result);
            } else {
                res.status(404);
                res.json({err: 'User not found'});
            }

        } else {
            res.status(400);
            res.json({err: "Id is not a number"});
        }
    }

    async create(req, res) {
        var {name, email, password} = req.body;

        if (name == undefined) {
            res.status(406);
            res.json({err: "Invalid name"});
            return;
        }

        if (email == undefined) {
            res.status(406);
            res.json({err: "Invalid email"});
            return;
        }

        if (password == undefined) {
            res.status(406);
            res.json({err: "Invalid password"});
            return;
        }

        var resultEmail = await User.findEmail(email);
        if(resultEmail.status) {
            var resultCreate = await User.new(name, email, password);
            if (resultCreate.status) {
                res.status(200);
                res.send("Tudo certo");
            } else {
                res.status(400);
                res.json({err: resultCreate.err});
            }
        } else {
            res.status(404);
            res.json({err: resultEmail.err});
        }
    }

    async remove(req, res) {
        var id = req.params.id;

        if (!isNaN(id)){
            var resultUser = await User.findById(id);
            if (resultUser.length > 0) {
                
                var resultDelete = await User.deleteUser(id);
                if (resultDelete.status) {
                    res.status(200);
                    res.send("User deleted sucessfully");
                } else {
                    res.json({err: "opa"});
                }
            } else {
                res.status(404);
                res.json({err: "User not found"});
            }
        } else {
          res.status(400);
          res.json({err: "Syntax invalid, id is not number"});  
        }
    }
}

module.exports = new UserController();