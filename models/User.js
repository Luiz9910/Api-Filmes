const knex = require('../database/connection');
const bcrypt = require('bcrypt');

class User {
    async getAll() {
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
            return {status: true, response};
        } catch (err) {
            return {status: false, err: "error in server response"};
        }
    }

    async findEmail(email) {
        try {
            var result = await knex.select().where({email: email}).table('user');

            if (result.length > 0) {
                return {status: false, err: "Email exist", result: result[0]};
            } else {
                return {status: true, err: "User not found", result: undefined};
            }
        } catch (err) {
            return {status: false};
        }
    }

    async new(name, email, password) {
        try {
            const saltRounds = 10;
            var hash = await bcrypt.hash(password, saltRounds);

            await knex.insert({email, password: hash, name, role: 0}).table("user");
            return {status: true};
        } catch(err) {
            return {status: false, err: "Failed to create user"};
        }
    }

    async update(email, name, id) {
        var result = await this.findById(id);
        var resultId = result.response;
      
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
                return {status: true}
            } catch (err) {
                return {status: false, err: "Error updating user", estate: 500};
            }

        } else {
            return {status: false, err: "User with this id does not exist", estate: 404};
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
}

module.exports = new User();    