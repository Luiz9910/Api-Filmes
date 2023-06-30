const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateContentBodyCreate = require("../factory/validationContentBodyCreate")
const validateContentBodyUpdate = require("../factory/validationContentBodyUpdate")

const secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

class UserController {
    async index(req, res) {
        try {
            const response = await User.getAll();
          
            if (!response.status) {
              return res.status(500).json({ err: response.err });
            }
          
            if (response.data.length <= 0) {
              return res.status(204).send();
            }
          
            res.status(200).json({users: response.data});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
        }
    }

    async findUser(req, res) {
        try {
            let id = req.params.id;

            if (isNaN(id)) {
                return res.status(400).json({err: "Id is not a number or is invalid"});
            }
    
            let result = await User.findById(id);
            if (!result.status) {
                return res.status(500).json({err: result.err});
            }
    
            if (result.response.length <= 0) {
                return res.status(404).json({err: 'User not found'});
            }
    
            res.status(200).json({user: result.response[0]});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
        }
    }

    async create(req, res) {
        try {
            const {name, email, password} = req.body;
            const contentBody = {name, email, password}

            const invalidFields = validateContentBodyCreate(contentBody);

            if (Object.keys(invalidFields).length > 0) {
                return res.status(406).json({ err: invalidFields });
            }

            const resultEmail = await User.findEmail(email);
            if(!resultEmail.status) {
                return res.status(500).json({err: resultEmail.err});
            }
    
            if (resultEmail.result.length > 0) {
                return res.status(409).json({err: "Email already exists"});
            }
    
            const saltRounds = 10;
            const hash = await bcrypt.hash(password, saltRounds);
    
            const resultCreate = await User.new(name, email, hash);
            if (!resultCreate.status) {
                return res.status(500).json({err: resultCreate.err});
            }
    
            res.status(201).json({response: "Sucessfully created"});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
        }
    }

    async userUpdate(req, res) {
        try {
            const id = req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({err: "Id is not a number or is invalid"});
            }
    
            const result = await User.findById(id);
            if (result.response.length <= 0) {
                return res.status(404).json({err: "User not found"});
            }
            
            const contentBody = {name: req.body.name, email: req.body.email};
            const dataUser = validateContentBodyUpdate(contentBody);
            if (Object.keys(dataUser).length <= 0) {
                return res.status(204).send();
            }

            const resultUpdate = await User.update(dataUser, id);
            if (!resultUpdate.status) {
                return res.status(500).json({err: "Error updating"});
            }
    
            res.status(200).json({response: "All right!"});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
        }
    }

    async remove(req, res) {
        try {
            const id = req.params.id;
            if (isNaN(id)){
                return res.status(400).json({err: "Id is not a number or is invalid"});  
            }    
    
            const result = await User.findById(id);
            if (!result.status) {
                return res.status(500).json({err: result.err});
            }
    
            if (result.response.length <= 0) {
                return res.status(404).json({err: "User not found"});
            } 
    
            let resultDelete = await User.deleteUser(id);
            if (!resultDelete.status) {
                return res.status(500).json({err: resultDelete.err});
            }
            
            res.status(200).json({response: "User deleted sucessfully"});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
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
        try {
            const {email, password} = req.body; 
            const contentBody = {email, password}

            const invalidFields = validateContentBodyCreate(contentBody);
            if (Object.keys(invalidFields).length > 0) {
                return res.status(406).json({ err: invalidFields });
            }
            
            let resultUserEmail = (await User.findEmail(email)).result[0];
            if (resultUserEmail == undefined) {
                return res.status(404).json({err: "User not found "}); 
            }
    
            if (resultUserEmail.email != email) {
                return res.status(401).json({err: "Email is incorrect"});
            } 
            
            if (!await bcrypt.compare(password, resultUserEmail.password)) {
                return res.status(401).json({err: "Invalid password"});
            }
            
            const token = jwt.sign({id: resultUserEmail.id,
                name:resultUserEmail.name,
                email, 
                role: resultUserEmail.role
            }, 
            secret,
            {expiresIn: "48h"});
    
            res.status(200).json({token});
        } catch (error) {
            return res.status(500).json({ err: 'An error occurred.' });
        }
    }
}

module.exports = new UserController();