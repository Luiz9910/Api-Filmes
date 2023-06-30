const knex = require('../database/connection');

class User {
    async getAll() {
        try {
            const result = await knex.select(["id","email", "name"]).table("user");
            return {status: true, data: result};
        } catch (err) {
            return {status: false, err: "Failed to select"};
        }
    }

    async findById(id) {
        try {
            const response = await knex.select(["id", "name", "email"]).where({id}).table("user");
            return {status: true, response};
        } catch (err) {
            return {status: false, err: "error in response"};
        }
    }

    async findEmail(email) {
        try {
            const result = await knex.select().where({email}).table('user');
            return {status: true, result};
        } catch (err) {
            return {status: false};
        }
    }

    async new(name, email, hash) {
        try {
            await knex.insert({email, password: hash, name, role: 0}).table("user");
            return {status: true};
        } catch(err) {
            return {status: false, err: "Failed to create user"};
        }
    }

    async update(dataUser, id) {
        try {
            await knex.update(dataUser).where({id}).table("user");
            return {status: true}
        } catch (err) {
            return {status: false};
        }
    }

      
    async deleteUser(id) {
        try {
            await knex.delete().where({id}).table('user');
            return {status: true};
        } catch(err) {
            return {status: false, err: "error deleting user"};
        }
    }
}

module.exports = new User();    