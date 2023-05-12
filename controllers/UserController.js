const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

class UserController {
    async index(req, res) {
        let response = await User.getAll();

        if (!response.status) {
            res.status(500);
            res.json({err: response.err});
            return;
        }

        let data = response.data;
        if (data.length <= 0) {
            res.status(204);
            res.json({err: "No Content"});
            return;
        } 

        res.status(200);
        res.send(data);
    }

    async findUser(req, res) {
        let id = req.params.id;

        if (isNaN(id)) {
            res.status(400);
            res.json({err: "Id is not a number"});
            return;
        }

        let result = await User.findById(id);
        if (!result.status) {
            res.status(500);
            res.json({err: result.err});
            return;
        }

        if (result.response.length <= 0) {
            res.status(404);
            res.json({err: 'User not found'});
            return;
        }

        res.status(200);
        res.send(result.response[0]);
    }

    async create(req, res) {
        let {name, email, password} = req.body;
        let contentBody = [name, email, password]
        const nameContent = ["name", "email", "password"]

        for (let content of contentBody) {
            for (let cont of nameContent) {
                if (content == undefined || content.length == 0) {
                    res.status(406);
                    res.json({err: `Invalid ${cont}`});
                    return;
                }
            }
        }

        var resultEmail = await User.findEmail(email);
        if(!resultEmail.status) {
            res.status(500);
            res.json({err: resultEmail.err});
            return;
        } 

        if (resultEmail.result.length > 0) {
            res.status(409);
            res.json({err: "Email exist"});
            return;
        }

        const saltRounds = 10;
        let hash = await bcrypt.hash(password, saltRounds);

        let resultCreate = await User.new(name, email, hash);
        if (!resultCreate.status) {
            res.status(500);
            res.json({err: resultCreate.err});
        }

        res.status(201);
        res.json({response: "Sucessfully created"});
    }

    async userUpdate(req, res) {
        let {name, email} = req.body;
        let dataUser = {};

        let id = req.params.id;
        if (isNaN(id)) {
            res.status(400);
            res.json({err: "Id is not a number or is invalid"});
            return;
        }

        let result = await User.findById(id);
        let resultId = result.response;

        if (resultId.length <= 0) {
            res.status(404)
            res.json({err: "User not found"})
            return;
        }
        
        let contentBody = [name, email]
        const nameContent = ["name", "email"]
        contentBody.forEach((content, index) => {
            if (content != undefined && content.length > 0) {
                dataUser[nameContent[index]] = content;
            }
        })

        let resultUpdate = await User.update(dataUser, id);
        if (!resultUpdate.status) {
            res.status(500);
            res.json({err: "Error updating"});
            return;
        }

        res.status(200);
        res.json({response: "All right!"})
    }

    async remove(req, res) {
        let id = req.params.id;

        if (isNaN(id)){
            res.status(400);
            res.json({err: "Syntax invalid, id is not number"});  
            return;
        }    

        let result = await User.findById(id);
        let resultUser = result.response;
    
        if (!result.status) {
            res.status(500);
            res.json({err: result.err});
            return;
        }

        if (resultUser.length <= 0) {
            res.status(404);
            res.json({err: "User not found"});
            return;
        } 

        let resultDelete = await User.deleteUser(id);
        if (!resultDelete.status) {
            res.status(500);
            res.json({err: resultDelete.err});
            return;
        }
        
        res.status(200);
        res.json({response: "User deleted sucessfully"});
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

        if (email == undefined || email.length == 0) {
            res.status(400);
            res.json({err: "Email is invalid "});
            return;
        }

        if (password == undefined || password.length == 0) {
            res.status(400);
            res.json({err: "Password is invalid "});
            return;
        }
        
        let resultUserEmail = await User.findEmail(email);
        resultUserEmail = resultUserEmail.result[0]
        if (resultUserEmail == undefined) {
            res.status(404);
            res.json({err: "User not found "}); 
            return;
        }

        if (resultUserEmail.email != email) {
            res.status(401);
            res.json({err: "Email is incorrect"});
            return;
        } 
        
        if (!await bcrypt.compare(password, resultUserEmail.password)) {
            res.status(401);
            res.json({err: "Invalid password"});
        }
        
        let token = jwt.sign({id: resultUserEmail.id,
            name:resultUserEmail.name,
            email, 
            role: resultUserEmail.role
        }, 
        secret,
        {expiresIn: "48h"});
        res.status(200);
        res.json({token: token});
    }
}

module.exports = new UserController();