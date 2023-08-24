require('dotenv').config();

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    user : process.env.USERCONNECTION,
    password : process.env.PASSWORDCONNETION,
    database : 'apiFilmes'
  }
});

module.exports = knex;
