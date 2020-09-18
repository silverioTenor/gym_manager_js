const express = require('express');
const routes = express.Router();
const instructors = require('./controllers/instructors');

// INSTRUCTORS ROUTES
routes.get('/', (req, res) => res.redirect("/instructors"));
routes.get('/instructors', instructors.index);
routes.get('/instructors/create', instructors.create);
routes.get('/instructors/:id', instructors.show);
routes.get('/instructors/:id/update', instructors.update);
routes.post('/instructors', instructors.post);
routes.put('/instructors', instructors.put);

// MEMBERS ROUTES
routes.get('/members', (req, res) => res.render("members/index"));

module.exports = routes;