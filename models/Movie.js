var knex = require('../database/connection');

class Movie {
    async new(title, details, sinopse, duration) {
        try {
            await knex.insert({title, details, sinopse, duration}).table("movie");
            return {status: true};
        } catch (e) {
            return {status: false, err: "error in saving movie"}
        }
    }
}

module.exports = new Movie()