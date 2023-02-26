const knex = require('../database/connection');
const bcrypt = require('bcrypt');

class User {
    async index() {
        try {
            var result = await knex.select(["id","email", "name"]).table("user");
            return {status: true, data: result};
        } catch (err) {
            return {status: false, err: "Failed to select"};
        }
    }

    async findById(id) {
        try {
            var response = await knex.select(["name", "email"]).where({id: id}).table("user");
            return response;
        } catch (err) {
            return {status: false};
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select().where({email: email}).table('user');

            if (result.length > 0) {
                return {status: false, err: "Email exist", result: result[0]};
            } else {
                return {status: true, err: "User not found"};
            }
        } catch (err) {
            return {status: false};
        }
    }

    async new(name, email, password) {
        try {
            const saltRounds = 10;
            var hash = await bcrypt.hash(password, saltRounds);

            await knex.insert({email, password: hash, name}).table("user");
            return {status: true};
        } catch(err) {
            return {status: false, err: "Failed to create user"};
        }
    }

    async deleteUser(id) {
        try {
            await knex.delete().where({id: id}).table('user');
            return {status: true};
        } catch(err) {
            return {status: false, err: "error deleting user"};
        }
    }

    async update(email, name, id) {
        var resultId = await this.findById(id);
        var dataUser = {};

        if (resultId.length > 0) {
            if (email != undefined) {
                dataUser.email = email;
            }   

            if (name != undefined) {
                dataUser.name = name;
            }

            try {
                await knex.update(dataUser).where({id: id}).table("user");
                return {status: true};
            } catch(err) {
                return {status: false, err: "error updating user", estate: 406 };
            }
        } else {
            return {status: false, err: "User with this id does not exist", estate: 404};
        }
    }
}

module.exports = new User();    