var knex = require('../database/connection');

class Movie {
    async new(title, details, sinopse, duration) {
        try {
            await knex.insert({title, details, sinopse, duration}).table("movie");
            return {status: true};
        } catch (e) {
            return {status: false, err: "error in saving movie"};
        }
    }

    async getAll() {
        try {
            var result = await knex.select().table("movie");
            return {status: true, data: result};
        }catch(err) {
            return {status: false, err: "server error"};
        }
    }
    
    async findByName(name) {
        try {
            var response = await  knex.select()
                .whereILike("title", "%"+ name +"%")
                .table("movie");
            return {status: true, data: response};
        } catch (err) {
            return {status: false, err: "server error"};
        }
    }

    async findById(id) {
        try {
            var response = await knex.select().where({id: id}).table("movie");
            return {status: true, response};
        } catch (err) {
            return {status: false, err: "error in server response"};
        }
    }

    async update(dataMovie, id) {
        try {
            await knex.update(dataMovie).where({id: id}).table("movie");
            return {status: true};
        } catch (err) {
            return {status: false, err: "Error in server"};
        }
    }
    
    async destroy(id) {
        try {
            await knex.delete().where({id: id}).table("movie");
            return {status: true};
        } catch(err) {
            return {status: false, err: "error deleting movie"};
        }
    }
}

module.exports = new Movie()