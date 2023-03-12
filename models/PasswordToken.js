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

    async validateTokenOfUser(id) {
        try {
            var resultToken = await knex.select(["passwordtokens.token", "user.name as userNAme", "passwordtokens.used as usedToken"]).table("user").innerJoin("passwordtokens", "passwordtokens.user_id", "user.id").where("user_id", id);
            
            if (resultToken[0].usedToken == 1) {
                return {status: false, err: "Token já foi usado", estate: 404}; 
            }

            if (resultToken.length > 0) {
                
                var resultSet = await this.setUsed(id);
                if (resultSet.status) {
                    return {status: true, result: resultToken}; 
                } else {
                    return {status: false, err: resultSet.err , estate: resultSet.estate};
                }

            } else {
                return {status: false, err: "Not found token of User", estate: 404};
            }

        } catch (err) {
            return {status: false, err: "Server database error", estate: 500};
        }
    }

    async setUsed(id) {
        try {
            await knex.update({used: 1}).where({user_id: id}).table("passwordtokens");
            return {status: true}; 
        } catch (err) {
            return {status: false, err: "Server database error in setUser", estate: 500};
        }
    }
}

module.exports = new PasswordToken();