const member = require('../models/members.dao');
const { age, date, typeBlood } = require('../../lib/utils');

module.exports = {
    index(req, res) {
        res.render("members/index", { membersList });
    },
    create(req, res) {
        return res.render("members/create");
    },
    post(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }
    },
    show(req, res) {
        return res.render("members/show", { member });
    },
    update(req, res) {
        return res.render("members/update", { member });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!");
            }
        }
    },
    delete(req, res) { }
}