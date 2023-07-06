const knex = require('../database/connection'); 

class Favorite_movie {
    async new(user_id, movie_id) {
        try {
            await knex.insert({user_id, movie_id}).table("favorite_movie");
            return {status: true}
        } catch (err){
            return {status: false, err: "error inserting"}
        }
    }

    async getAll(id) {
        try {
            let result = await knex.select().where({"user_id": id}).table("favorite_movie");
            return {status: true, data: result};
        }catch(err) {
            return {status: false, err: "error in getting movies"};
        }
    }

    async getOne(id) {
        try {
            const result = await knex.select().where({id}).table("favorite_movie")
            return {status: true, result}
        } catch(err) {
            return {status: false, err: "error in getting movie"}
        }
    }

    async delete(id) {
        try {
            await knex.delete().where({id}).table("favorite_movie")
            return {status: true}
        } catch (err) {
            return {status: false, err: "error in deleting"}
        }
    }
}

module.exports = new Favorite_movie()