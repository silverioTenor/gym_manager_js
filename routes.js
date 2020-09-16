const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => res.redirect("/instructors"));

routes.get('/instructors', (req, res) => res.render("instructors/index"));

routes.get('/instructors/create', (req, res) => res.render("instructors/create"));

routes.post('/instructors', (req, res) => res.send("Recebido!"));

routes.get('/members', (req, res) => res.render("members/index"));

module.exports = routes;