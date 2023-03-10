var knex = require("../database/connection");
var User = require("./User");

class PasswordToken {
    async create(email) {
        var resultUser = await User.findEmail(email);

        var token = await Date.now();
        console.log(resultUser);
        if (resultUser != undefined) {
            if (resultUser.result.email == email) {
                try {
                    await insert({
                        user_id: user.id,
                        used: 0,
                        token: token // UUID
                    }).table("passwordtokens");

                    return {status: true, token: token}
                } catch (err) {
                    return {status: false, err: ""}
                }
            } else {
                return {status: false, err: ""}
            }
        } else {
            return {status: false, err: ""}
        }
    }
}

module.exports = new PasswordToken();