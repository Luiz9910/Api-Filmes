var knex = require("../database/connection");
var User = require("./User");

class PasswordToken {
    async create(email) {
        var resultUser = await User.findEmail(email);

        var token = 1231231;
        if (resultUser != undefined) {         
                try {
                    await knex.insert({token, used: 0, user_id:resultUser.result.id }).table("passwordtokens");
                    return {status: true, token};
                } catch(err) {
                    return {status: false, err: "Error in creating token", estate: 400};
                }
        } else {
            return {status: false, err: "user not Found, email not exist", estate: 404};
        }
    }
}

module.exports = new PasswordToken();