const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

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

            if (!result.status) {
                res.status(400);
                res.json({err: result.err});
                return;
            }

            if (result.response.length > 0) {
                res.status(200);
                res.send(result.response[0]);
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
                res.status(201);
                res.json({response: "Sucessfully created"});
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
            var result = await User.findById(id);
            var resultUser = result.response;
        
            if (!result.status) {
                res.status(400);
                res.json({err: result.err});
                return;
            }

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

    async userUpdate(req, res) {
        var {name, email} = req.body;
        var id = req.params.id;

        if (!isNaN(id)) {

            var resultUpdate = await User.update(email, name, id);
            if (resultUpdate.status) {
                res.status(200);
                res.send("all right!");
            } else {
                res.status(resultUpdate.estate);
                res.json({err: resultUpdate.err});
            }
            
        } else {
            res.status(400);
            res.json({err: "Id is not a number or is invalid"});
        }
    }

    async recoverpassword(req, res) {
        var email = req.body.email;

        var resultPassword = await PasswordToken.create(email);

        if (resultPassword.status) {
            res.status(200);
            res.json({token: resultPassword.token});
        } else {
            res.status(resultPassword.estate);
            res.json({err: resultPassword.err});
        }
    }

    async changePassword(req, res) {
        var token = req.body.token;
        var id = req.params.id;

        if (!isNaN(id)) {

            var resultToken = await PasswordToken.validateTokenOfUser(id);
            if (resultToken.status) {

                if (resultToken.result[0].token == token) {
                    res.status(200);
                    res.json({response: "All Right!"});
                } else {
                    res.status(406);
                    res.json({err: "Sintax error (token)"});
                }
            }else {
                res.status(resultToken.estate);
                res.json({err: resultToken.err});
            }

        } else {
            res.status(400);
            res.json({err: "Id is not a number or is invalid"});
        }    
    }
    
    async login(req, res) {
        var {email, password} = req.body; 

        if (email == undefined) {
            res.status();
            res.json({err: "Email is invalid "});
            return;
        }

        if (password == undefined) {
            res.status();
            res.json({err: "Password is invalid "});
            return;
        }

        var resultUserEmail = await User.findEmail(email);
        if (resultUserEmail.result != undefined) {

            if (resultUserEmail.result.email == email) {
                if (await bcrypt.compare(password, resultUserEmail.result.password)) {
                    var token = jwt.sign({ email: resultUserEmail.result.email, name: resultUserEmail.result.name}, secret);
                    
                    res.status(200);
                    res.json({token: token});
                } else {
                    res.status(401);
                    res.json({err: "Invalid password"});
                }
            } else {
                res.status(406);
                res.json({err: "User not found "});
            }

        } else {
            res.status(406);
            res.json({err: "User not found "});
        }
    }
}

module.exports = new UserController();