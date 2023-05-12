const knex = require('../database/connection');

class Movie {
    async new(title, details, sinopse, duration, year, classification, cover) {
        try {
            await knex.insert({title, details, sinopse, duration, year, classification, cover}).table("movie");
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
            return {status: false, err: "error in getting movies"};
        }
    }
    
    async findByName(name) {
        try {
            var response = await  knex.select()
                .whereILike("title", "%"+ name +"%")
                .table("movie");
            return {status: true, data: response};
        } catch (err) {
            return {status: false, err: "error in getting movie"};
        }
    }

    async findById(id) {
        try {
            var response = await knex.select().where({id}).table("movie");
            return {status: true, response};
        } catch (err) {
            return {status: false, err: "error in fetching movie"};
        }
    }

    async update(dataMovie, id) {
        try {
            await knex.update(dataMovie).where({id}).table("movie");
            return {status: true};
        } catch (err) {
            return {status: false, err: "Error in updating movie"};
        }
    }
    
    async destroy(id) {
        try {
            await knex.delete().where({id}).table("movie");
            return {status: true};
        } catch(err) {
            return {status: false, err: "Error deleting movie"};
        }
    }
}

module.exports = new Movie();