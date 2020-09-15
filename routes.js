const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => res.send("Tudo ok!"));

module.exports = routes;