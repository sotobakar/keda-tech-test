const environment = process.env.NODE_ENV || 'development'
const config = require('../configs/db.config')[environment];
const knex = require("knex");
/** @type {import("knex").Knex} */
module.exports = knex(config);