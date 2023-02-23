const knex = require('../database/connection');

class User {
    async index() {
        try {
            var result = await knex.select(["id","email", "name"]).table("user");
            return {status: true, data: result}
        } catch (err) {
            return {status: false, err: "Failed to select"}
        }
    }

    async findEmail(email) {
        try {
            await knex.select().where({email: email}).table('user');
            return {status: false, err: "Email exist"};
        } catch (err) {
            return {status: true};
        }
    }

    async new(name, email, password) {
        try {
            await knex.insert({email, password, name}).table("user");
            return {status: true};
        } catch(err) {
            return {status: false, err: "Failed to create user"};
        }
    }
}

module.exports = new User();