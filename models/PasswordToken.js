const knex = require("../database/connection");
const User = require("./User");

class PasswordToken {
    async create(email) {
        let resultUser = await User.findEmail(email);

        let numerosAleatorios = [];
        for (let i = 0; i < 6; i++) {
            numerosAleatorios.push(Math.round(Math.random() * 9)); // gera um número aleatório entre 0 e 99
        }

        const token = numerosAleatorios.join("");

        if (resultUser != undefined) {
            try {
                await knex.insert({token, user_email: resultUser.result[0].email }).table("passwordtokens");
                return {status: true, token};
            } catch(err) {
                return {status: false, err: err, estate: 400};
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
